import {Md5} from 'ts-md5';
import * as fsPromise from 'fs/promises';

export async function file_md5(path: string):Promise<string> {
    return fsPromise.readFile(path)
        .then((buffer) => {
            return Md5.hashStr(buffer.toString());
        });
}