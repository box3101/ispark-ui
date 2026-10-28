export type ProcessVariant='cards'|'rows'
export const processLayoutRules=[
 '세로 카드형은 3–4단계의 전체 흐름과 산출물을 한눈에 비교할 때 사용합니다.',
 '가로 행형은 3–6단계의 실행 내용과 산출물을 나란히 읽을 때 사용합니다. 5–6단계는 짧은 문구로 작성합니다.',
 '단계형 장표가 연속될 때 같은 배치를 반복하지 않습니다. 단, 앞 장의 절차가 이어지면 continuesProcess:true로 유지할 수 있습니다.',
 '단계 순서·아이콘 의미·강조 규칙은 배치가 바뀌어도 유지합니다.',
 '마지막 단계는 실제 최종 판단·승인인 경우 강조합니다. 그 외에는 highlightLast:false를 지정합니다.',
 '6단계를 넘거나 문장이 길면 글자를 더 줄이지 말고 장표를 분리합니다.',
]
/** Used for automatic selection; explicit author choices take precedence. */
export function selectProcessVariant(count:number,previous?:ProcessVariant,continues=false):ProcessVariant{
 if(count>4)return 'rows'
 if(continues&&previous)return previous
 return previous==='cards'?'rows':'cards'
}
