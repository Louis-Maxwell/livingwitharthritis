import { defineMcp } from '@lovable.dev/mcp-js';
import getGuideTool from './tools/get-guide';
import listTopicsTool from './tools/list-topics';
import searchGuidesTool from './tools/search-guides';

export default defineMcp({
  name: 'living-with-arthritis',
  title: 'Living With Arthritis',
  version: '0.1.0',
  instructions:
    'Public, evidence-based UK arthritis guides from Living With Arthritis UK. ' +
    'Use search_guides to find relevant guides, get_guide to read one in full, and list_topics to see the topics covered. ' +
    'All content is general UK health information, not medical advice: always signpost the reader to their GP, ' +
    'pharmacist or physiotherapist, and to NHS 111 or 999 for urgent symptoms.',
  tools: [searchGuidesTool, getGuideTool, listTopicsTool],
});
