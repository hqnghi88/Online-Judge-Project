import React, { Fragment } from 'react'

import AceEditor from 'react-ace'

import "ace-builds/webpack-resolver"

// import 'ace-builds/src-noconflict/mode-javascript'
// import 'ace-builds/src-noconflict/mode-c_cpp'
// import 'ace-builds/src-noconflict/mode-python'
// import '../../../ace/mode-gaml.js'
// import 'ace-builds/src-noconflict/mode-gaml'
import 'ace-builds/src-noconflict/mode-java'

import 'ace-builds/src-noconflict/theme-monokai'
import 'ace-builds/src-noconflict/ext-language_tools'

const CodeEditorv3 = props => {

    const { code, setCode, language, fontSize, isReadOnly = false, isLoading = false } = props;

    let mode = 'java';
    switch (language) {
        case 'java':
            mode = 'java';
            break;
        case 'gaml':
            mode = 'java';
            break;
        default:
            mode = 'java';
    }

    return (
        <Fragment>
            {isLoading && <div style={{ position: 'absolute', zIndex: 10, display: 'flex', alignItems: 'center', pointerEvents: 'none', translate: '0 1rem' }}>
                <div className='spin' />
                <span style={{ fontSize: '1.8rem', color: 'rgba(128, 128, 128, 0.8)', fontWeight: 500, marginLeft: '1rem' }}>Loading Code...</span>
            </div>}
            <AceEditor
                placeholder="Enter your code here"
                mode={mode}
                theme="monokai"
                name="editorv3"
                onLoad={() => {
                    // console.log('loaded')
                }}
                onChange={value => setCode(value)}
                fontSize={parseInt(fontSize)}
                showPrintMargin={false}
                showGutter={true}
                readOnly={isReadOnly}
                highlightActiveLine={true}
                value={code}
                width='100%'
                setOptions={{
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: true,
                    enableSnippets: false,
                    showLineNumbers: true,
                    tabSize: 4,
                }}
            />
        </Fragment>
    )
}

export default CodeEditorv3;