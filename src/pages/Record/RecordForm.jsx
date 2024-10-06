import React, { useState } from "react";
import { Stack } from '@mui/material'
import RecordBoard from "./components/RecordBoard";
import RecordSaveButton from "./components/RecordSaveButton";
import RecordTitle from "./components/RecordTitle";
import RecordUpper from "./components/RecordUpper";

const RecordForm = () => {
  // useState로 상태 관리 (텍스트와 이미지 파일)
  const [question, setquestion] = useState('가장 행복했던 일은 무엇인가요?');
  const [text, setText] = useState("");
  const [inputCount, setInputCount] = useState(0);
  const [uploadedImage, setUploadedImage] = useState(null);

  // 업로드 파일 관리
    const handleSetImage = (uploadedImage) => {
      setUploadedImage(uploadedImage); // Set uploaded image file
  };

  // 텍스트 변경 및 글자수 계산 처리 함수
  const handleTextChange = (e) => {
    setText(e.target.value.slice(0,199));
    setInputCount(e.target.value.length);
  };

  // 폼 제출 처리 함수
  const handleSubmit = (e) => {
    e.preventDefault();

    // 폼 데이터 확인
    if (!text) {
      alert("기록을 작성하세요!");
      return;
    }

    // FormData 객체를 사용해 이미지 파일과 텍스트 데이터를 서버로 전송
    const formData = new FormData();
    formData.append("text", text);
    formData.append("image", uploadedImage);
    formData.append("title", question)

    console.log("제목:", question);
    console.log("텍스트:", text);
    console.log("이미지:", uploadedImage);
    alert(question);
  };
  
  return (
    <Stack sx={contentstyle}>
      <Stack>
        <RecordUpper sx={{float:'left'}}></RecordUpper>
      </Stack>
      <Stack>
        <RecordTitle question={question} setquestion={setquestion}></RecordTitle>
      </Stack>
      <form onSubmit={handleSubmit}>
          <Stack>
            <RecordBoard
              handleSetImage={handleSetImage}
              text={text}
              inputCount={inputCount}
              handleTextChange={handleTextChange}
            />
          </Stack>
          <RecordSaveButton></RecordSaveButton>
      </form>
    </Stack>
  );
};

export default RecordForm;


//Design
const contentstyle={
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: 'fit-content',
  width: '100vw',
  maxWidth: '480px',
  background: '#4D4D4D',
  position: 'relative',
  margin: '0 auto',
}
