import React, {useState, props} from 'react'
import Dropzone from 'react-dropzone'
import {Icon} from 'antd';
import axios from 'axios';

function FileUpload(props) {
  
  const [Images, setImages] = useState([])
  
  const dropHandler = (files) => {
    let formData = new FormData();
    const config = {
      header:{'content-type': 'multipart/form-data'}
    }
    formData.append("file", files[0])
    axios.post('/api/product/image', formData, config)
    .then(res => {
      if(res.data.success){
        setImages([...Images, res.data.filePath])
        props.refreshFunction([...Images, res.data.filePath])
      } else{
        alert("파일 업로드에 실패하였습니다.")
      }
    })
  }
  
  const deleteHandler = (image) => {
    const currentIndex = Images.indexOf(image)
    let newImages = [...Images]
    newImages.splice(currentIndex, 1)
    setImages(newImages)
    props.refreshFunction([...Images])
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between'}}>
      <Dropzone onDrop={dropHandler}>
        {({getRootProps, getInputProps}) => (
          <section>
            <div 
              style={{
                width: 300, height: 240, border: '1px solid lightgray',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}
              {...getRootProps()}>
              <input {...getInputProps()} />
              {/*<p>Drag 'n' drop some files here, or click to select files</p>*/}
              <Icon type="plus" style={{ fontSize: '3rem'}}/>
            </div>
          </section>
        )}
      </Dropzone>
      <div style={{ display: 'flex', width: '350px', height: '240px', overflowX: 'scroll'}} >
        {Images.map( (image, index) => (
          <div onDoubleClick={() => deleteHandler(image)} key={index}>
            <img style={{ minWidth: '300px', width: '300px', height: '240px' }}
                  src={`http://localhost:5000/${image}`} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default FileUpload


