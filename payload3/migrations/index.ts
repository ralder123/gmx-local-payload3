import * as migration_20261020_054301 from './20261020_054301';
import * as migration_20261022_015418 from './20261022_015418';
import * as migration_20261023_054341 from './20261023_054341';
import * as migration_20261026_020638 from './20261026_020638';

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
    name: '20261026_020638'
  },
];
