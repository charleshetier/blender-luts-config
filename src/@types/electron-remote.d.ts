export {}

import fs from 'fs';

declare module 'electron' {
    interface Remote {
        require(moduleSpecifier: 'fs'): typeof fs;
    }
}
