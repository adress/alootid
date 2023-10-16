
import RateMyServer from "./ratemyserver/Ratemyserver";

const ragnarokDatabase = new RateMyServer();

ragnarokDatabase.copyItems();
ragnarokDatabase.copyItemsVendor();
ragnarokDatabase.copyMonsterMap();