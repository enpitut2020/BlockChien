//返却記録
//メッセージ

contract Main{
    // 貸し借りの履歴
    struct Date{
        uint256 Year;
        uint256 Month;
        uint256 Day;
    }
    struct Book{//(本に対しての履歴がいるかも？)(著者)
        address User;//借りている人
        uint num;//固有番号
        string name;//本の名前
        uint256 status;//状態(0 : 貸し出し中, 1 : 在庫あり)
        uint256 left;//同じ名前の本の在庫冊数
        uint256 reserved_num; //予約人数
        uint pages;
        Date return_date;//返却日
        uint256[] friends;//同じ名前の本の固有番号
    }

    struct Student{
        address User;
        uint num;//学籍番号
        string name;
        //uint point;
        uint256[] borrowed_book; //固有番号 貸し出し履歴
        uint256[] reserved_book; //固有番号　予約リスト
    }
    // struct Record{
    //     address User;
    //     string Title;
    //     uint256 Type; //0:返却する　1:借りる
    //     uint256 Year;
    //     uint256 Month;
    //     uint256 Day;
    //     bool isReturned; // 返却済みならtrue,履歴の表示で過去のものを表示しないため
    // }

    Book[] booklist;//index:固有番号
    Student[] studentlist;

    

    constructor () public {
            address nouser = address(0x0);
            uint256[] memory friend;
             booklist.push(Book(nouser,0,"BlockChain",0,1,6,100,Date(2020,7,24),friend));
             booklist.push(Book(nouser,1,"Cooking for Geek",0,1,3,100,Date(2020,6,29),friend));
             booklist.push(Book(nouser,2,"GitHub 入門",0,1,7,100,Date(2020,6,18),friend));
             booklist.push(Book(nouser,3,"Mastering Ethere",0,1,2,100,Date(2020,7,23),friend));
             booklist.push(Book(nouser,4,"TOEIC 公式",0,1,7,100,Date(2020,6,8),friend));
             booklist.push(Book(nouser,5,"Cooking for Geek",0,1,0,100,Date(2020,7,12),friend));
             booklist.push(Book(nouser,6,"徹底演習",0,1,1,100,Date(2020,6,5),friend));
             booklist.push(Book(nouser,7,"徹底研究",0,1,9,100,Date(2020,6,1),friend));
             booklist.push(Book(nouser,8,"ニューラルネットワーク",0,1,6,100,Date(2020,5,12),friend));
             booklist.push(Book(nouser,9,"dapp & ゲーム",0,1,0,100,Date(2020,6,17),friend));
             booklist.push(Book(nouser,10,"画像認識",0,1,0,100,Date(2020,7,30),friend));
             booklist.push(Book(nouser,11,"やさしいC++",0,1,2,100,Date(2020,6,3),friend));
             booklist.push(Book(nouser,12,"機械学習",0,1,3,100,Date(2020,6,18),friend));
             booklist.push(Book(nouser,13,"応用情報",0,1,7,100,Date(2020,5,14),friend));
             booklist.push(Book(nouser,14,"algorithm",0,1,10,100,Date(2020,6,24),friend));
             booklist.push(Book(nouser,15,"ぴえん。",0,1,9,100,Date(2020,6,18),friend));
             booklist.push(Book(nouser,16,"Toefl",0,1,5,100,Date(2020,6,18),friend));
             
        uint256[] memory a;

        studentlist.push(Student(address(0x123), 1111111, "A", a, a));
        studentlist.push(Student(address(0x321), 2222222, "B", a, a));
        for(uint256 i = 0; i < 4; i++){
            studentlist[0].borrowed_book.push(i);
            studentlist[1].borrowed_book.push(i+8);
        }
        for(uint256 i = 4; i < 8; i++){
            studentlist[0].reserved_book.push(i);
            studentlist[1].reserved_book.push(i+8);
        }
    }
    
    mapping(uint256 => address) public userBook; //本(固有番号)　=> ユーザー
/*
    function returnBook(uint256 num) view public {
        require(num < booklist.length);
        if(msg.sender == userBook[num]){ //ユーザが実際に本を借りた
            userBook[num] = address(0x0);
            booklist[num].status = 1;
            booklist[num].left++;
        }
    }
*/

    function borrowBook(uint256 num) public {
        require(num < booklist.length);

        if(booklist[num].left != 0){ // 図書館に借りたい本がある
            booklist[num].status = 0;
            booklist[num].left--;
            for (uint256 i = 0; i < booklist[num].friends.length; i++){
                booklist[booklist[num].friends[i]].left--;
            }
            //booklist[num].return_date =  ;//貸し出し日から計算したい
            
            //userBook[msg.sender] = bookNum[book];
        }
        else{
            
        }
        
    }

    function LengthofBookList() public view returns(uint){
        return booklist.length;
    }
    
    function BookInformation(uint256 num) public view returns(string memory ,uint256 , uint256, uint256, uint256, uint256, uint256){
        uint256 year = booklist[num].return_date.Year;
        uint256 month = booklist[num].return_date.Month;
        uint256 day = booklist[num].return_date.Day;
        return (booklist[num].name, booklist[num].status, booklist[num].left, booklist[num].reserved_num, year, month, day);
    }
    

    function UserInformation(uint256 num) public view returns(uint256[] memory,uint256[] memory){
        /*
        for(int i = 0; i < studentlist[num].borrowed_book.length; i++){
            booklist[studentlist[num].borrowed_book[i]].name;
            booklist[studentlist[num].borrowed_book[i]].return_date;
        }
        */
        return (studentlist[num].borrowed_book, studentlist[num].reserved_book);
    }
     

}

