import { injectable } from "inversify";

export interface IExempleService {
  getHelloWorld(): string;
  getHelloWorldWithName(name: string): string;
}


@injectable()
export class ExempleService implements IExempleService {
  getHelloWorld(): string {
    return "Hello World!";
  }

  getHelloWorldWithName(name: string): string {
    return `Hello ${name}!`;
  }
}
