import * as migration_20260916_032833_init from './20260916_032833_init';

export const migrations = [
  {
    up: migration_20260916_032833_init.up,
    down: migration_20260916_032833_init.down,
    name: '20260916_032833_init'
  },
];
