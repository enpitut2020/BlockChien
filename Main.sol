pragma experimental ABIEncoderV2;
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
        uint256 borrow_date;//貸出日
        uint256 return_date;//返却日
        uint256[] friends;//同じ名前の本の固有番号
        Date Bdate;
        Date Rdate;
    }

    struct Student{
        address User;
        uint num;//学籍番号
        string name;
        int256 point;
        uint256[] borrowed_book; //固有番号 貸し出し履歴
        uint256[] reserved_book; //固有番号　予約リスト
        uint256 lastDay; // 最終更新日
    }
    /*
    struct Record{
        address User;
        string Title;
        uint256 Type; //0:返却する　1:借りる
        uint256 Year;
        uint256 Month;
        uint256 Day;
        bool isReturned; // 返却済みならtrue,履歴の表示で過去のものを表示しないため
    }
    */

    Book[] booklist;//index:固有番号
    Student[] studentlist;
    mapping(address => uint) public students; // 利用者のアドレス -> studentlistのインデックス
    int256 P = 100;//ポイント初期値 
    address lib = address(0xfbE00a15070cdF61B86098e651f053655292b424);

    constructor () public {
            address nouser = address(0x0);
            string[17] memory book_name = ["BlockChain", "Cooking for Geek","GitHub 入門","Mastering Ethere","TOEIC 公式","Cooking for Geek","徹底演習",
                                    "ニューラルネットワーク","dapp & ゲーム","dapp & ゲーム","画像認識","やさしいC++","機械学習","応用情報","algorithm","ぴえん。","Toefl"];
            uint256[] memory friend;
            for (uint i = 0; i < 8; i++) {
                Date memory borrow_d = Date(2020, 7, 24);
                Date memory return_d = Date(2020, 7, 26);
                booklist.push(Book(nouser,i,book_name[i],0,1,6,100,block.timestamp - 2 days,block.timestamp,friend,borrow_d,return_d));
            }//18469(2020/7/26)
            for (uint i = 8; i < 16; i++) {
                Date memory borrow_d = Date(2020, 7, 24);
                Date memory return_d = Date(2020, 7, 25);
                booklist.push(Book(nouser,i,book_name[i],0,1,3,100,block.timestamp - 2 days,block.timestamp - 3 days,friend,borrow_d,return_d));

            }
            
             /*booklist.push(Book(nouser,0,"BlockChain",0,1,6,100,Date(2020,7,24),friend));
             booklist.push(Book(nouser,1,"Cooking for Geek",0,1,3,100,Date(2020,6,29),friend));
             booklist.push(Book(nouser,2,"GitHub 入門",0,1,7,100,Date(2020,6,18),friend));
             */
             
        uint256[] memory a;
        
        address[6] memory member = [lib,//(図書館)
                            address(0xAbf977caE05A77D85577d58fE03D19639849ea01),//(及川)
                            address(0x324bAF512Ffc6f37D91F9fE3F3464a7eA792AaeF),//(XU KAIWEN)
                            address(0xEd8e2574FA50244c5bE1e1b4c58892e3ad0FcBFa),//(菊地)
                            address(0xc8eDA6054Eb36457dad52C7E734CD282e2a3575A),//金
                            address(0xaf4a4BA302A069dF4ffDDdEc73A8957580747462)];//発表
        string[6] memory member_name = ["図書館","及川","XU KAIWEN","菊地","金","発表"];
        for (uint i = 0; i < member.length; i++) {
            studentlist.push(Student(member[i], 1111111*(i+1), member_name[i], P, a, a, today()-1));
            for(uint256 j = 8; j < 12; j++){
                studentlist[i].borrowed_book.push(j);
            }
            for(uint256 j = 4; j < 8; j++){
                studentlist[i].reserved_book.push(j);
            }
            students[member[i]] = i;
        }
        // studentlist.push(Student(oikawa, 1111111, "A", P, a, a, today()));
        // studentlist.push(Student(address(0x321), 2222222, "B", P, a, a, today()));
    
        // 0xAbf977caE05A77D85577d58fE03D19639849ea01(及川)
        // 0x5718bB3653623219e49609E355F4F60369F73cD3(今川)
        // 0x324bAF512Ffc6f37D91F9fE3F3464a7eA792AaeF(XU KAIWEN)
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
    //207
    function BookInformation(uint256 num) public view returns(Book memory) {
        return booklist[num];
    }
    /*
    function BookInformation(uint256 num) public view returns(string memory name, uint256 status, uint256 left, uint256 reserved_num, uint256 borrow_year, uint256 borrow_month, uint256 borrow_day, uint256 return_year, uint256 return_month, uint256 return_day){
        //uint256 borrow_year = 1970 + booklist[num].borrow_date / 1 years;
        //uint256 borrow_year = 2020;
        //uint256 borrow_month = booklist[num].borrow_date / 1;//month
        //uint256 borrow_month = 7;
        //uint256 borrow_day = 1 + booklist[num].borrow_date % 1 years / 1 days ;
        uint256 borrow_day = 1 + booklist[num].borrow_date / 1 days - 18469 + 26;
        //uint256 return_year = 1970 + booklist[num].return_date / 1 years;
        //uint256 return_year = 2020;
        //uint256 return_month = booklist[num].return_date / 1;//month
        //uint256 return_month = 7;
        uint256 return_day = 1 + booklist[num].return_date / 1 days - 18469 + 26;

        if(borrow_day <= 31){
            borrow_month = 1;
        }
        else(borrow_day <= 59){
            borrow_month = 2;
            borrow_day -= 31;
        }
        
        //return (booklist[num].name, booklist[num].status, booklist[num].left, booklist[num].reserved_num, borrow_year, borrow_month, borrow_day, return_year, return_month, return_day);
        return (booklist[num].name, booklist[num].status, booklist[num].left, booklist[num].reserved_num, 2020, 7, borrow_day, 2020, 7, return_day);
    }
    */
    /*function BookInformation(uint256 num) public view returns(string memory name, uint256 status, uint256 left, uint256 reserved_num, uint256 year, uint256 month, uint256 day){
        uint256 year = booklist[num].return_date.Year;
        uint256 month = booklist[num].return_date.Month;
        uint256 day = booklist[num].return_date.Day;
        return (booklist[num].name, booklist[num].status, booklist[num].left, booklist[num].reserved_num, year, month, day);
    }*/
    
    function UserInformation() public view returns(Student memory){
        uint256 num = students[msg.sender];
        return studentlist[num];
    }
    /*
    function UserInformation() public view returns(uint256[] memory,uint256[] memory){
        uint256 num = students[msg.sender];    
        return (studentlist[num].borrowed_book, studentlist[num].reserved_book);
    }
    */
    
    function today() public view returns (uint256) {
        return block.timestamp / 1 days;
    }

    function update() public {
        uint256 stu = students[msg.sender];
        // 日付が変わっていれば、使用値とチェック日付をリセットする
        uint256 tod = today();
        if (tod > studentlist[stu].lastDay) { // 更新してるかどうか
            //ポイント更新　延滞テェック
            for(uint256 i = 0; i < studentlist[stu].borrowed_book.length; i++){ 
                if(booklist[studentlist[stu].borrowed_book[i]].return_date / 1 days < tod){ // 返却日を過ぎてる
                    //studentlist[stu].point -= (int)(tod - (booklist[studentlist[stu].borrowed_book[i]].return_date / 1 days)) * 10;
                    studentlist[stu].point -= (int)(tod - studentlist[stu].lastDay) * 10;
                }
            }
            if (studentlist[stu].point > 0) studentlist[stu].point++; // ログインボーナス
            studentlist[stu].lastDay = tod;//最終更新日を更新
        }
    }

    function pay() public payable {//0.0000001ethで1ポイント回復
        //address payable lib = (address,payable)(0x5718bB3653623219e49609E355F4F60369F73cD3);
        //uint balance = gotten_point * 0.0000001;
        int256 gotten_point = (int)(msg.value / 1000000000000000); // wei

        uint256 stu = students[msg.sender];
        studentlist[stu].point += gotten_point;
    }

    function withdraw() public {
        if (msg.sender == lib)
        msg.sender.transfer(address(this).balance);
    }
}

