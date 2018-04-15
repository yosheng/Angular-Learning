#Angular从零到一

本專案根據書本章節進行撰寫 書本範例以 Angular2 為主
當前穩定版本為 Angular5 一方面調整寫法 一方面給自己做學習紀錄

作者代碼：https://github.com/wpcfan/awesome-tutorials/tree/chap01/angular2/ng2-tut

##2018-04-15
關於 in-memory-web-api 無法新增刪除修改問題 暫時無解 
參考 Johnpapa 使用 Angular4 搭配 0.3.0 版本正常
https://github.com/johnpapa/angular-tour-of-heroes

參考 QuinntyneBrown 使用 Angular5 搭配 0.5.0 版本 同樣會顯示錯誤
https://github.com/QuinntyneBrown/angular-tour-of-heroes

錯誤訊息如下
status:422
statusText:"Unprocessable Entity"
參考資料如 
[InMemoryDbService can not add new item when collection is empty](https://github.com/angular/angular/issues/20885)
[Issue with findObjectById (in path)](https://github.com/angular/in-memory-web-api/issues/136)

曾經思考是否為更換模組問題
參考資料如
[Using only @angular/common/http but @angular/http still required](https://github.com/angular/in-memory-web-api/issues/140)

最後附上 Angular in-memory-web-api [版本變更紀錄](https://changelogs.md/github/angular/in-memory-web-api/)

![Angular从零到一](https://m.360buyimg.com/n12/jfs/t4189/113/3010039843/174960/9aa3cc44/58d8d48bNd0392b98.jpg!q70.jpg) 
