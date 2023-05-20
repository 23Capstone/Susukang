import React, {useState, createContext} from 'react';
import axios from 'axios';

const REST_API_KEY = 'e693e6de088e2630dec10f8f8ac3e9fc';

const KakaoContext = createContext();

export const KakaoContextProvider = ({children}) => {
  const [summary, setSummary] = useState();

  const onCreate = ({prompt}) => {
    kogptApi(prompt, 160, 0.4)
      .then(response => {
        setSummary(...response.generations);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <KakaoContext.Provider value={{summary, onCreate}}>
      {children}
    </KakaoContext.Provider>
  );
};

const kogptApi = async (prompt, maxTokens = 160, topP = 1.0) => {
  try {
    const response = await axios.post(
      'https://api.kakaobrain.com/v1/inference/kogpt/generation',
      {
        prompt: prompt,
        max_tokens: maxTokens,
        top_p: topP,
      },
      {
        headers: {
          Authorization: 'KakaoAK ' + REST_API_KEY,
          'Content-Type': 'application/json',
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

// const Kakao = () => {
//   let prompt =
//     '카카오(각자대표 남궁훈, 홍은택)의 임팩트 커머스 카카오메이커스와 카카오브레인(대표 김일두)이 세계 동물의 날을 맞아 멸종 위기 동물 보호에 힘을 보탠다. 카카오메이커스와 카카오브레인은 4일 세계 동물의 날을 맞아, 카카오브레인의 AI 아티스트';
//   prompt +=
//     '칼로 와 현대미술가 고상우 작가가 협업한 제품을 오는 12일까지 카카오메이커스에서 단독 판매한다고 밝혔다. 판매 수익금 전액은 WWF(세계자연기금)에 기부할 예정이다. 이번 프로젝트에 참여한 AI 아티스트 칼로는 minDALL-E, RQ-Transformer 등 카카오브레인의 초거대 이미지 생성 AI 모델을 발전시켜 하나의 페르소나로 재탄생한 AI 아티스트다. 1.8억 장 규모의 텍스트-이미지 데이터셋을 학습해 이해한 문맥을 바탕으로 다양한 화풍과 스타일로 이미지를 생성할 수 있다. 올해 6월에는 고상우 작가와의 공동 작업으로 생성한 1,000개의 호랑이 이미지를 조합한 디지털 작품으로 전시회를 진행한 바 있다.';
//   prompt +=
//     '이번 프로젝트를 통해 선보이는 제품은 맨투맨과 머그컵이다. 칼로가 생성한 호랑이 그림과 푸른색 사진 예술의 선구자인 고상우 작가 특유의 드로잉이 조화롭게 어우러져 완성된 500점의 호랑이 그림 모자이크 Blue Tiger가 새겨져 있다. 판매 수익금 전액은 WWF(세계자연기금)에 기부됨과 동시에, 낭비 없는 생산을 위해 주문 수량만큼 제품을 생산하는 카카오메이커스의 환경친화적 주문제작 방식(POD 생산)을 도입했다. ';
//   prompt +=
//     '카카오브레인 김일두 대표는 "AI 아티스트 칼로가 생성한 예술 작품으로 멸종 위기 동물 보호 활동에 동참하게 되어 기쁘다"며, "앞으로도 우리의 AI 기술을 통해 사회에 환원할 수 있는 의미 있는 프로젝트에 지속 참여하겠다"며 포부를 전했다.';
//   prompt +=
//     '카카오 정영주 메이커스 실장은 "지난 8월 고양이의 날을 기념한 제품을 기획/판매해 기부한데 이어 사회의 다양한 구성원을 존중하고 배려하는 프로젝트를 이어가고 있다"며 "더 나은 세상을 만들기 위한 이용자들의 관심을 확인하고 있으며, 앞으로도 임팩트 커머스로서 다양한 가치를 담은 메이커스만의 제품을 선보일 것" 이라고 밝혔다.\n';
//   prompt += '요약 해줘:';
//   console.log(`내용: ${prompt}`);

//   kogptApi(prompt, 150, 0.7)
//     .then(response => {
//       console.log(response);
//     })
//     .catch(error => {
//       console.error('Error:', error);
//     });
// };

export default KakaoContext;
