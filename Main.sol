//返却記録
//メッセージ

contract Main{
    // 貸し借りの履歴
    struct Record{
        address User;
        string Title;
        uint256 Type; //0:返却する　1:借りる
        uint256 Year;
        uint256 Month;
        uint256 Day;
        bool isReturned; // 返却済みならtrue,履歴の表示で過去のものを表示しないため
    }
    Record record;

    mapping(address => uint256) public userBook; //ユーザ　=> 本
    mapping(string => uint256) public bookNum;

    constructor () public {
        bookNum["BlockChain"] = 1;
    }

     function makeRecord(uint256 year,uint256 month, uint256 day, string memory title, uint Type) public {
        record.Title = title;
        record.Year = year;
        record.Month = month;
        record.Day = day;
        record.Type = Type;
    }
    // function seeRecord() {

    // }
    

    function returnBook(string memory book) public returns (bool){
        if(userBook[msg.sender] == bookNum[book]){ //ユーザが実際に本を借りた
            return true; 
        }
        return false;
    }

    function borrowBook(string memory book) public returns (bool){
        if(bookNum[book] != 0){ // 図書館に借りたい本がある
            userBook[msg.sender] = bookNum[book];
            return true;
        }
        else{
            return false;
        }
        
    }
}
