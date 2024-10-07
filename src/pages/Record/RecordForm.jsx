import React, { useState, useRef } from "react";
import { Stack, Typography } from '@mui/material'
import RecordBoard from "./components/RecordBoard";
import RecordSaveButton from "./components/RecordSaveButton";
import RecordTitle from "./components/RecordTitle";
import RecordUpper from "./components/RecordUpper";
import SnackBar from "@/components/SnackBar";
import AlertModal from "@/components/AlertModal";

const RecordForm = () => {
  // useState로 상태 관리
  const [question, setquestion] = useState('가장 행복했던 일은 무엇인가요?');
  const [text, setText] = useState("");
  const [inputCount, setInputCount] = useState(0);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarText, setSnackbarText] = useState('');
  const [openModal, setopenModal] = useState(false); //모달 상태 추가
  // RecordBoard 참조 (자동스크롤)
  const recordBoardRef = useRef(null); // RecordBoard 참조
  // const 장식오브젝트 = useRef(null); //장식오브젝트 참조



  // 업로드 파일 관리
    const handleSetImage = (uploadedImage) => {
      setUploadedImage(uploadedImage); // Set uploaded image file
  };

  // 텍스트 변경 및 글자수 계산 처리 함수
  const handleTextChange = (e) => {
    setText(e.target.value.slice(0,199));
    setInputCount(e.target.value.length);
  };



  // 스낵바 텍스트 변경
  const handleSnackTextChange = (e) => {
    setSnackbarText(e.target.value.slice(0,199));
  };

  // 스낵바 닫기 처리 함수
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };


  //모달 확인 버튼 처리 함수
  const handleAcceptModal = () => {
    // FormData 객체를 사용해 이미지 파일과 텍스트 데이터를 서버로 전송
    const formData = new FormData();
      formData.append("text", text);
      formData.append("image", uploadedImage);
      formData.append("title", question)
    
      console.log("제목:", question);
      console.log("텍스트:", text);
      console.log("이미지:", uploadedImage);
  }

  // 모달 닫기 처리 함수
  const handleCloseModal = () => {
    setopenModal(false);
  };


  // 폼 제출 처리 함수
  const handleSubmit = (e) => {
    e.preventDefault();

    // 폼 데이터 확인
    if (!text) {
      setOpenSnackbar(true); //기록한 내용이 없을 경우 스낵바 True
      setSnackbarText('추억이 작성되지 않았어요.')
      recordBoardRef.current.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    //장식이 없을 경우
    // else if(!object) {
    //   setOpenSnackbar(true); //기록한 내용이 없을 경우 스낵바 True
    //   setSnackbarText('장식이 선택되지 않았어요.')
    // 장식오브젝트.current.scrollIntoView({ behavior: 'smooth' });
    //   return;
    // }

    //text가 있을 경우 모달 오픈
    setopenModal(true);
  };

  

  
  return (
    <Stack sx={contentstyle}>
      <Stack>
        <Stack>
          <RecordUpper sx={{float:'left'}}></RecordUpper>
        </Stack>
        <Stack>
          <RecordTitle question={question} setquestion={setquestion}></RecordTitle>
        </Stack>
        <form onSubmit={handleSubmit}>
            <Stack ref={recordBoardRef}>
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
      
      <Stack>
        <SnackBar
          openSnackbar={openSnackbar}
          handleCloseSnackbar={handleCloseSnackbar}
          snackbarText={snackbarText}
          setSnackbarText={handleSnackTextChange}
        />
      </Stack>
      <AlertModal
        open={openModal}
        onClose={handleCloseModal}
        buttonText="확인"
        onButtonClick={handleAcceptModal}
      >
       <Stack sx={{alignItems:'center'}}>
            <Typography sx={modaltextstyle1}>보관후에는 수정이 불가해요.</Typography>
            <Typography sx={modaltextstyle2}>이대로 전달할까요?</Typography>
        </Stack>
      </AlertModal>
    </Stack>
  );
};

export default RecordForm;


//Design
const contentstyle={
  display: 'flex',
  alignItems: 'center',
  height: '100%',
  width: '37.5rem',
  background: '#4D4D4D',
  margin: '0 auto',
  padding: '1.5rem'
}

const modaltextstyle1={
  fontFamily: "Noto Sans",
  fontSize: '0.92rem',
  fontWeight: '700',
  textAlign: 'center',    
  color:'#7F5539'
}
const modaltextstyle2={
  fontFamily: "Noto Sans",
  fontSize: '0.92rem',
  fontWeight: '700',
  textAlign: 'center',    
  color:'#282828'
}