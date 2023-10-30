<template>
  <html>
    <head>
        <meta charset="UTF-8">
        <meta http-eqiv="X-UA-Compatible" content="IE=edge">
        <title>PayType SDK</title>
    </head>
    <body>
        <div>
            <h1>PayType SDK Demo</h1>
            <h4>卡號 + 有效月年 同欄位</h4>
            <ul>
              <li><a href="/payType/creditAllinOne">信用卡欄位</a></li>
            </ul>
            <h3>卡號 + 有效月年 + 背面三碼 區分欄位</h3>
            <ul>
              <li><a href="/payType/creditOnce">信用卡一次付清</a></li>
            </ul>
        </div>
        
    </body>
</html>
</template>


<script setup>

</script>

<style scoped>
  @import url('https://fonts.googleapis.com/earlyaccess/notosanstc.css');

  body{
    font-family: 'NOTO Sans TC', '微軟正黑體', sans-serif;
  }
</style>
