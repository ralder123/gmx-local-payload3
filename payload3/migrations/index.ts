import * as migration_20261020_054301 from './20261020_054301';
import * as migration_20261022_015418 from './20261022_015418';
import * as migration_20261023_054341 from './20261023_054341';
import * as migration_20261026_020638 from './20261026_020638';
import * as migration_20261026_040753_create_metals_collection from './20261026_040753_create_metals_collection';
import * as migration_20261031_213217 from './20261031_213217';
import * as migration_20261101_201101 from './20261101_201101';

export const migrations = [
  {
    up: migration_20261020_054301.up,
    down: migration_20261020_054301.down,
    name: '20261020_054301',
  },
  {
    up: migration_20261022_015418.up,
    down: migration_20261022_015418.down,
    name: '20261022_015418',
  },
  {
    up: migration_20261023_054341.up,
    down: migration_20261023_054341.down,
    name: '20261023_054341',
  },
  {
    up: migration_20261026_020638.up,
    down: migration_20261026_020638.down,
    name: '20261026_020638',
  },
  {
    up: migration_20261026_040753_create_metals_collection.up,
    down: migration_20261026_040753_create_metals_collection.down,
    name: '20261026_040753_create_metals_collection',
  },
  {
    up: migration_20261031_213217.up,
    down: migration_20261031_213217.down,
    name: '20261031_213217',
  },
  {
    up: migration_20261101_201101.up,
    down: migration_20261101_201101.down,
    name: '20261101_201101'
  },
];
