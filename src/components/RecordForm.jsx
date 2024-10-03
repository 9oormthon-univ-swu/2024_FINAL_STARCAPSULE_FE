import React, { useState } from "react";
import { Stack, Button } from '@mui/material'

const style = {
    width: '312px',
    height: 'fit-content',
    borderRadius: '20px',
    background: '#FFFCFA',
    padding: '24px',
}

const imgcontainer = {
    width: '100%',
    textAlign: 'center',
    marginBottom: '16px'
}

const rcstyle = {
    width: '100%',
    height: '307px',
    margin: '0 auto',
    borderRadius: '20px',
}

const formbtn = {
    width: '100%',
    height: '62px',
    padding: '20px, 100px',
    background: '#7F5539'
}

const RecordForm = () => {
  // useState로 상태 관리 (텍스트와 이미지 파일)
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [inputCount, setInputCount] = useState(0);

  // 텍스트 변경 및 글자수 계산 처리 함수
  const handleTextChange = (e) => {
    setText(e.target.value);
    setInputCount(e.target.value.length);
  };

  // 이미지 파일 선택 처리 함수
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result); // 업로드한 이미지 출력
      };
      reader.readAsDataURL(file);
    }
  };

  // 폼 제출 처리 함수
  const handleSubmit = (e) => {
    e.preventDefault();

    // 폼 데이터 확인
    if (!text) {
      alert("기록을 작성하세요!");
      return;
    } else if (!image) {
      alert("이미지를 업로드하세요!");
      return;
    }

    // FormData 객체를 사용해 이미지 파일과 텍스트 데이터를 서버로 전송
    const formData = new FormData();
    formData.append("text", text);
    formData.append("image", image);

    console.log("텍스트:", text);
    console.log("이미지:", image);
    alert('폼 제출 완료');
  };

  return (
    <Stack sx={style}>
        <Stack sx={imgcontainer}>
            {previewUrl && (
            <div>
                <img src={previewUrl} alt="미리보기" style={{ width: "264px" }} />
            </div>)}
            <label htmlFor="image">이미지업로드</label>
            <input
                type="file"
                id="image"
                accept=".png, .jpg, .svg"
                onChange={handleImageChange}
                style={{ display: "none" }}
            />
        </Stack>

        <Stack sx={rcstyle}>
            <form onSubmit={handleSubmit}>
                <Stack sx={rcstyle}>
                    <textarea
                        id="text"
                        value={text}
                        onChange={handleTextChange}
                        maxLength={"200"}
                        placeholder="기록을 오늘의 질문 대신 다른 내용을 기록해도 좋아요! 자유롭게 남기고 싶은 추억을 작성해주세요:)"
                        style={{
                            width:'100%',
                            height:'290px',
                            border:'none',
                            overflow: 'hidden',
                            resize: 'none',
                            background: '#FFFCFA',
                            fontSize: '18px',
                            lineHeight: '28px'
                        }}
                    />
                </Stack>
                <Stack>
                    <div style={{ textAlign:'right' }}>
                        <span>{inputCount}</span>
                        <span>/200</span>
                    </div>
                </Stack>
                <Button variant="contained" type="submit" sx={formbtn}>추억 보관하기</Button>
            </form>
        </Stack>

    </Stack>
  );
};

export default RecordForm;
