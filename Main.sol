//返却記録
//メッセージ

contract Main{
    mapping(address => uint256) public userBook; //ユーザ　=> 本
    mapping(uint256 => string) public bookNum;

    function returnBook(address usr, uint256 book) public returns (bool){
        if(userBook[usr] != 0){
            return true;
        }
        return false;
