import { Container } from "inversify";
import TYPES from "./types";
import { CacheService } from '../services/cacheService';

// CONTROLLERS (needed for routing)
import '../controllers/utilityController';
import '../controllers/CacheController';

export class ContainerConfigLoader {
    public static Load(): Container {
        const container = new Container();
        container.bind<CacheService>(TYPES.Cache).to(CacheService);

        return container;
    }
}