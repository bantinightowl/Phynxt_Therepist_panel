import { useRef, useState } from 'react';


import TextEditer from '../../TextEditer/TextEditer';

export default function App() {
  const editorRef = useRef(null);
  const [textValue,setTextValue]=useState("");

  const log = () => {
    if (editorRef.current) {
      setTextValue(editorRef.current.getContent())
    }
  };
  return (
    <div>
          <h1>React Rich Text Editor</h1>
          <div className='editordiv'>
      <TextEditer
        onInit={(_evt, editor) => editorRef.current = editor}
        initialValue='<p>This is my first writing.</p>'
        init={{
          height: 0.5 * window.innerHeight,
          width: 0.75 * window.innerWidth,
          menubar: false,
          plugins: [
            'advlist', 'anchor', 'autolink', 'link', 'lists',
            'searchreplace', 'table', 'wordcount', 'code', 'directionality',
            'media', 'preview', 'image', 'emoticons'
          ],
          toolbar:
            'undo redo | blocks | bold italic underline forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'code directionality media table preview image emoticons',
        
          content_style:
            'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
        
          file_picker_types: 'image media',
          file_picker_callback: (callback, value, meta) => {
            const input = document.createElement('input');
            input.setAttribute('type', 'file');
            input.setAttribute('accept', meta.filetype === 'image' ? 'image/*' : 'video/*');
        
            input.onchange = async () => {
              const file = input.files[0];
              const formData = new FormData();
              formData.append('file', file);
        
              try {
                const res = await fetch('https://your-api.com/upload', {
                  method: 'POST',
                  body: formData,
                });
        
                const data = await res.json();
                callback(data.url); // The server should return { url: "https://..." }
              } catch (err) {
                console.error('Upload failed:', err);
                alert('Upload failed');
              }
            };
        
            input.click();
          },
        }}
        

        onChange={() => log()}

      />
      <button onClick={log}>Get HTML</button>
      {/* <textarea value={textValue}></textarea> */}
      <div dangerouslySetInnerHTML={{__html: textValue}}></div>
    </div>
    
    </div>

  );
}