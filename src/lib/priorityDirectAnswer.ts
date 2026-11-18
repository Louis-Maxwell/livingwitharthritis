import answers from "@/data/priority-direct-answers.json";
export function hasPriorityDirectAnswer(route: string) {
  return Object.prototype.hasOwnProperty.call(answers, route);
}
