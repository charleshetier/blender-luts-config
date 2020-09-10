import React from 'react';
import { remote } from 'electron';
import { useRecoilState } from 'recoil';
import { ocioFileState } from 'states';

const Fs = remote.require('fs');


// fs.chmod

export const ConfigSelection = () => {

    const [ocioFile, setOcioFile] = useRecoilState(ocioFileState);

    async function openConfigFilePicker() {
        const result = await remote.dialog.showOpenDialog({
            properties: ['openFile'],
            defaultPath: 'C:\\Program Files\\Blender Foundation\\Blender 2.90\\2.90\\datafiles\\colormanagement',
            filters: [{ name: 'ocio config', extensions: ['ocio'] }]
        });

        if (!result.canceled) {
            setOcioFile(result.filePaths[0]);
        }
    }

    function test() {
        Fs.readFile(
            'C:\\Program Files\\Blender Foundation\\Blender 2.90\\2.90\\datafiles\\colormanagement\\config.ocio',
            (err, data) => {
                console.log(data.toString());

                                
            });
    }

    return <div>
        <button
            onClick={openConfigFilePicker}>
            Open ocio config file
        </button>
        <button onClick={test}>Test</button>
        <div>{ocioFile}</div>
    </div>;
}

