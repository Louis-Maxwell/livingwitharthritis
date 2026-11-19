import {describe,it,expect} from 'vitest';
import {render,screen} from '@testing-library/react';
import ReactMarkdown from 'react-markdown';
import {remarkChatDestinations} from '../chatDestinations';
describe('chat destination labels',()=>{
 it('labels raw known paths even inside emphasis without changing targets',()=>{
  render(<ReactMarkdown remarkPlugins={[remarkChatDestinations]}>{'Read **/conditions/arthritis**, /exercises and /benefits-pip.'}</ReactMarkdown>);
  expect(screen.getByRole('link',{name:'Arthritis types and treatments'})).toHaveAttribute('href','/conditions/arthritis');
  expect(screen.getByRole('link',{name:'Free exercise routines'})).toHaveAttribute('href','/exercises');
  expect(screen.getByRole('link',{name:'PIP and benefits guide'})).toHaveAttribute('href','/benefits-pip');
 });
 it('does not rewrite existing links, external URL text, code, unknown paths, queries or fragments',()=>{
  const {container}=render(<ReactMarkdown remarkPlugins={[remarkChatDestinations]}>{'[Chosen label](/exercises) https://outside.invalid/exercises `/exercises` /unknown /exercises?q=a /exercises#knee'}</ReactMarkdown>);
  expect(screen.getByRole('link',{name:'Chosen label'})).toHaveAttribute('href','/exercises');
  expect(container.querySelectorAll('a')).toHaveLength(1);
  expect(container).toHaveTextContent('/unknown');
 });
});
