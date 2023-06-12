
import RateMyServer from "./ratemyserver/Ratemyserver";

const ragnarokDatabase = new RateMyServer();

ragnarokDatabase.copyItems();
ragnarokDatabase.copyItemsRenewal();
ragnarokDatabase.copyItemsVendor();
ragnarokDatabase.copyMonsterMap();