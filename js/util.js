/*
    서버와 통신하는 메소드, 다이얼로그, 자동 로그아웃 기능, 사용자 정보, 텍스트 관리
*/

function getText(key) {
    var text = "";
    // text.json파일을 파싱하고 key값을 이용하여 원하는 text를 찾아서 반환
    return text;
}

function autoLogout() {
    /**
     * 자동 로그아웃
     * 사용자가 마우스를 움직이는 등의 이벤트시 실행됨 (움직이면 처음부터 카운트다운)
     * 특정 시간 동안 카운트 다운 된 후 자동 로그아웃 다이얼로그 띄우기
     */
}

function showAutoLogoutDialog() {
    /**
     * 자동 로그아웃 다이얼로그를 띄움
     * 특정 시간 동안 카운트 다운하는 동안 버튼 입력이 없다면 로그아웃
     */
}

function showLogoutDialog() {
    /**
     * 로그아웃 다이얼로그 logout()을 활용
     */
}

function logout() {
    /**
     * 로그아웃
     * 가지고 있는 사용자 정보들을 모두 초기화
     * 메인화면으로 옮기기
     */
}

function login() {
    /**
     * 로그인
     * 서버 통신 필요
     * 서버 결과에 따라서 로그인 다이얼로그 띄워줌
     * 최종 로그인의 경우 이 파일에 있는 사용자 정보 관련한거 정해줘야 함
     */
}

function getRecentBadges() {
    /**
     * 서버 통신 필요
     * 메인화면을 위한 최근 배지 정보 받기
     */
}

function getRecentQuests() {
    /**
     * 서버 통신 필요
     * 메인화면을 위한 최근 퀘스트 정보 받기
     */
}

function getNowChallenge() {
    /**
     * 서버 통신 필요
     * 현재 진행해야할 챌린지 정보 받아오기
     */
}

function getBadges() {
    /**
     * 서버 통신 필요
     * 모든 모은 배지 정보 받아오기 (최근 순서로 sort되어 있어야 함)
     */
}

function getQuests() {
    /**
     * 서버 통신 필요
     * 모든 해결한 퀘스트 정보 받아오기 (최근 순서로 sort되어 있어야 함)
     */
}

function getRandomBooks() {
    /**
     * 서버 통신 필요
     * 안읽은 책 중에서 랜덤한 책 리스트 받아오기
     */
}