# 문법

## 보간법: Mustach(이중 중괄호 구문)
{{}}

## 원시 HTML
v-html
단순문자를 html코드 안에 넣어줘라

XSS취약점

## javascript 표현식 사용
{{number + 1}} 식으로 단순 코드는 실행이 된다.

## 디렉티브
`v-`로 시작하는 특수 속성

## 동적 전달 인자
27:00 참고
동적으로 값을 넣는다

data() {
  attributeName='src'
}

<a v-bind:[attributeName]="url">

## 수식어
@keydown.enter 같은 .으로 연결한 것

## 약어
v-bind |    :
v-on   |    @

## Data 속성
활용하는 데이터를 정의하는 용도

## methods
함수, 지정해 놓은 반응형 데이터를 this로 참조하여 활용할 수 있다.

## Computed와 속성
새로 계산된 데이터
## Computed 속성의 캐싱 vs 메서드

## Watch
모든 반응형 데이터를 감시

# 클래스 스타일과 바인딩