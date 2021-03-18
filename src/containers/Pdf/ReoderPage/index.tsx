import styled from "styled-components";

import "./index.css";
import PdfView from "../../../components/PdfView";
import PdfUpload from "../../../components/PdfUpload";

const CustomBtn = styled.div`
  position: relative;
  left: 0%;
  right: 0%;
  top: 0%;
  bottom: 0%;
  
  background: #000000;
  border-radius: 5px;;
  width: 200px;
  height: 60px;
  left: 60px;
  top: 67px;
  margin: 5px;
  cursor: pointer;
`;

const CustomBtnText = styled.div`
  position: relative;
  height: 22px;
  left: 25px;
  right: 24px;
  top: calc(50% - 22px / 2);

  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 28px;
  line-height: 21px;
  display: flex;
  align-items: center;
  text-align: center;
  margin: 5px;

  color: #ffffff;
`;

export function ReorderPage() {
  const reorder = async () => {
    // reorder api call
  };

  const viewPdf = () => {
    //
  }

  return (
    <div>
      <PdfUpload />

      {/* Enter pages nos */}
      <CustomBtn onClick={viewPdf}>
        <CustomBtnText>View </CustomBtnText>
      </CustomBtn>

      <CustomBtn onClick={reorder}>
        <CustomBtnText>Reorder </CustomBtnText>
      </CustomBtn>

      {/* <PdfView divId="adobe-dc-view-1" location="http://localhost:8000/api/v1/pdf/download?file=3087.pdf" fileName="3087.pdf" /> */}
      {/* <PdfView divId="adobe-dc-view-2" location="https://documentcloud.adobe.com/view-sdk-demo/PDFs/Bodea Brochure.pdf" fileName="Bodea Brochure.pdf" /> */}
    </div>
  );
}

export default ReorderPage;
