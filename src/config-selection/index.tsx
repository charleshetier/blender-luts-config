import React from 'react';
import { remote } from 'electron';
import { useRecoilState } from 'recoil';
import { ocioFileState } from 'states';

export const ConfigSelection = () => {

    const [ocioFile, setOcioFile] = useRecoilState(ocioFileState);

    async function openConfigFilePicker() {
        const result = await remote.dialog.showOpenDialog({
            properties: ['openFile'],
            defaultPath: 'C:\\Program Files\\Blender Foundation\\Blender 2.90\\2.90\\datafiles\\colormanagement',
            filters: [{name: 'ocio config', extensions: ['ocio']}]
        });

        if(!result.canceled) {
            setOcioFile(result.filePaths[0]);
        }
    }

    return <div>
        <button
            onClick={openConfigFilePicker}>
            Open ocio config file
        </button>
        <div>{ocioFile}</div>
    </div>;
}

