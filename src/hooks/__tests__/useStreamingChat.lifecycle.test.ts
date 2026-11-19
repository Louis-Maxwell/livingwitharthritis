import {describe,it,expect,vi,afterEach} from 'vitest';
import {renderHook,act} from '@testing-library/react';
import {useStreamingChat} from '../useStreamingChat';
import {chatService} from '@/lib/chatbot/optimizedChatService';
vi.mock('@/lib/chatHistory',()=>({loadAnonChatHistory:()=>[],saveAnonChatHistory:()=>{},clearAnonChatHistory:()=>{}}));
vi.mock('@/lib/chatbot/optimizedChatService',()=>({chatService:{sendMessage:vi.fn()}}));
vi.mock('@/lib/arthritisChatFallback',()=>({getFallbackAnswer:()=> 'fallback'}));
describe('chat reset lifecycle',()=>{
 afterEach(()=>{vi.unstubAllEnvs();vi.unstubAllGlobals();vi.clearAllMocks();});
 it('an old completion cannot unlock or relabel a newer conversation',async()=>{
  const pending:{done:()=>void,status:(x:string)=>void}[]=[];
  vi.mocked(chatService.sendMessage).mockImplementation((_q,_u,_chunk,_complete,status)=>new Promise(resolve=>pending.push({done:()=>resolve({topicId:'x',score:1,response:'reply',related:[]}),status:status!})));
  const {result}=renderHook(()=>useStreamingChat());let old:Promise<void>;let current:Promise<void>;
  await act(async()=>{old=result.current.sendMessage('old');await Promise.resolve()});
  act(()=>result.current.newChat());
  await act(async()=>{current=result.current.sendMessage('current');await Promise.resolve()});
  expect(result.current.isLoading).toBe(true);
  await act(async()=>{pending[0].status('stale status');pending[0].done();await old!});
  expect(result.current.statusLabel).not.toBe('stale status');
  expect(result.current.isLoading).toBe(true);
  await act(async()=>{pending[1].done();await current!});
  expect(result.current.isLoading).toBe(false);
  expect(result.current.messages.filter(m=>m.role==='user').map(m=>m.content)).toEqual(['current']);
 });
 it('clear suppresses late status, chunks and failures',async()=>{
  let chunk: (text:string)=>void = ()=>{};
  let status: (text:string)=>void = ()=>{};
  let fail: (reason:Error)=>void = ()=>{};
  vi.mocked(chatService.sendMessage).mockImplementation((_q,_u,onChunk,_complete,onStatus)=>new Promise((_resolve,reject)=>{chunk=onChunk;status=onStatus!;fail=reject;}));
  const {result}=renderHook(()=>useStreamingChat());let pending:Promise<void>;
  await act(async()=>{pending=result.current.sendMessage('old');await Promise.resolve()});
  await act(async()=>{await result.current.clearMessages()});
  await act(async()=>{chunk('late');status('late status');fail(new Error('late failure'));await pending!});
  expect(result.current.messages).toEqual([]);
  expect(result.current.statusLabel).toBeNull();
  expect(result.current.isLoading).toBe(false);
 });
 it('unmount aborts an explicitly enabled remote request without starting local fallback',async()=>{
  vi.stubEnv('VITE_CHAT_API','enabled');
  let signal:AbortSignal|undefined;
  vi.stubGlobal('fetch',vi.fn((_url,options)=>new Promise((_resolve,reject)=>{
    signal=options.signal;
    signal!.addEventListener('abort',()=>reject(new DOMException('Cancelled','AbortError')),{once:true});
  })));
  vi.mocked(chatService.sendMessage).mockClear();
  const {result,unmount}=renderHook(()=>useStreamingChat());let pending:Promise<void>;
  await act(async()=>{pending=result.current.sendMessage('test');await Promise.resolve()});
  expect(signal?.aborted).toBe(false);
  unmount();
  await act(async()=>{await pending!});
  expect(signal?.aborted).toBe(true);
  expect(chatService.sendMessage).not.toHaveBeenCalled();
 });
});
