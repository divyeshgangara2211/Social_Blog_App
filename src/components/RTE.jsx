import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';


function RTE({ name , control , label , defaultValue = '' }) {
  return (
    <div className='w-full'>
      { label && <label className='inline-block mb-1 pl-1'>{label}</label> }

      <Controller 
      name = {name || "content"}
      control = {control} 
      render = { ( {field : {onChange}} ) => (
        <Editor 
        apiKey='916cyq9i3f53056mwilfzs94rpq7gm3iroe50lov81tnjgsq'
        initialValue='default value'
        init = {{
          initialValue: defaultValue,
          branding: false,
          height: 500,
          menubar: true,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount',
            'codesample', 'emoticons', 'autosave'
          ],
          toolbar: 'undo redo | ' +
          'bold italic forecolor backcolor | alignleft aligncenter ' +
          'alignright alignjustify | bullist numlist outdent indent | ' +
          'removeformat | codesample emoticons | help',
          content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
        }}
        onEditorChange = { onChange }
        />
      )}
      />
    </div>

  )
}

export default RTE