import { Container } from "inversify";


import { IExempleService, ExempleService } from "./services/ExempleService";

const container = new Container();

container.bind<IExempleService>("ExempleService").to(ExempleService).inSingletonScope();

// container.bind<IPuppeteerService>(TYPES.PuppeteerService).to(PuppeteerService).inSingletonScope();
export default container;