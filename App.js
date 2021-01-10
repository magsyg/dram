import React from 'react';
import {StyleSheet, StatusBar, Text, View, ActivityIndicator, Image} from 'react-native';

import ADGScreen from './screen/ADGScreen';
import PlayerScreen from './screen/PlayerScreen'
import GameModeScreen from './screen/GameModeScreen';
import GameScreen from './screen/GameScreen';
import Colors from './constants/colors';


import * as Font from 'expo-font';

function generateGame(totalQ, players, gameMode, fresh) {
  var allQ = [];

  var neverH = JSON.parse(JSON.stringify(require('./questions/neverQ.json')));
  var neverHD = [neverH.question.filter((q) => (q.itchy===1)),neverH.question.filter((q) => q.itchy===0), neverH];

  var ratherH = JSON.parse(JSON.stringify(require('./questions/ratherQ.json')));
  var ratherHD = [ratherH.question.filter(q => q.itchy===1),ratherH.question.filter(q => q.itchy===0),ratherH];

  var storyH = JSON.parse(JSON.stringify(require('./questions/storyTimeQ.json')));
  var storyHD = [storyH.question.filter(q => q.itchy===1),storyH.question.filter(q => q.itchy===0), storyH];

  var whoH = JSON.parse(JSON.stringify(require('./questions/whoQ.json')));  
  var whoHD = [whoH.question.filter(q => q.itchy===1),whoH.question.filter(q => q.itchy===0), whoH];

  var everyH = JSON.parse(JSON.stringify(require('./questions/everyQ.json')));  
  var everyHD = [everyH.question.filter(q => q.itchy===1),everyH.question.filter(q => q.itchy===0), everyH];

  var typesH = [neverHD, ratherHD, storyHD, whoHD, everyHD];
  switch(gameMode){
    case 0:
      addMoreQ(totalQ/4);
      break;
    case 1:
      addMoreQ(0);
      break;
    case 2:
      addMoreQ(totalQ/3);
    break;
  }
  
  var rulesN = 0;
  if(gameMode!=1 && players.length>3) {
    rulesN=(Math.floor(totalQ/16 + Math.random()*3)*2);
  }

  var egg = 0;
  var eggQ = JSON.parse(JSON.stringify(require('./questions/eggQ.json'))); 
  for (p in players) {
    if (eggQ.hasOwnProperty(players[p].name)) {
      if(Math.random() < 0.2) {
        egg++
        addQ(eggQ[players[p].name]);
      }
    }
  }

  var maxB = totalMaxB();
  var totalBombs = Math.floor(Math.random()*(maxB+1))*2;
  if(gameMode===2) totalBombs = maxB*2;
  if(gameMode===1) totalBombs = 0;

  var superQrate = 0;
  if(players.length>3) {
    superQrate = (players.length>5) ? totalQ/8:totalQ/10;
    superQrate = Math.floor(superQrate)
  }
  if(gameMode===1) superQrate = 0;
  addOnceQ((totalQ-allQ.length-totalBombs-rulesN-superQrate-egg));

  shuffle(allQ);
  filter(15);

  if(gameMode!=1) {
    addRules(rulesN);
  }

  addBombs(totalBombs);
  addSuperQ(superQrate);
  setNames();
  freshG();
    function totalMaxB () {
      var bs = 0;
      var t = 0+totalQ;
      if(fresh===0) {
        t-=10;
      }
      while(t>=25) {
        bs+=1;
        t-=25;
      }
      return bs;
    }
    function addOnceQ(amount) {
      for(var i = 0; i < amount; i++) {
        var grov;
        if(Math.floor(Math.random()*3)>1) {
          grov = (gameMode == 2) ? 1:0;
        } else {
          grov = (gameMode == 2) ? 0:1;
        }
        var ranType = Math.floor(Math.random() * 6);
        if(ranType===5) ranType = 0;
        var ranQ = Math.floor(Math.random() * typesH[ranType][grov].length);
        var q = typesH[ranType][grov][ranQ];
        addMQ(q,typesH[ranType][2].title, typesH[ranType][2].underQ);
        typesH[ranType][grov]=typesH[ranType][grov].filter((q) => q.id != typesH[ranType][grov][ranQ].id);
      }
    }
    function addMoreQ(amount) {
      var divQ = JSON.parse(JSON.stringify(require('./questions/divQ.json')));
      var typesH = [divQ.questions1,divQ.questions2];
      for(var i = 0; i < amount; i++) {
        var ranType = Math.floor(Math.random() * 2);
        var wQ = Math.floor(Math.random() * typesH[ranType].length);
        if(typesH[ranType][wQ].title == "SP") {
          if(players.length > 5) {
            addQ(typesH[ranType][wQ].question[1]);
          } else {
            addQ(typesH[ranType][wQ].question[0]);
          }
        } else if (typesH[ranType][wQ].title == "Nødt") {
          if (gameMode == 2) {
            let dare = typesH[ranType][wQ].question[Math.floor(Math.random()*typesH[ranType][wQ].question.length)];
            addMQ(dare, typesH[ranType][wQ].title, typesH[ranType][wQ].underQ)
          } else {
            addOnceQ(1);
          }
        } else {
          addQ(typesH[ranType][wQ]); 
        }
      }
    }
    function addSuperQ(amount) {
      var superQ = JSON.parse(JSON.stringify(require('./questions/divQ.json'))).superQ;
      const loops = (players > 4) ? 0:1;
      const qLimit = Math.floor(amount/(4-loops));

      var place = 0;
      var nPlace = Math.floor(allQ.length/amount)+1;

      var sQ = [];
      var count = 0;
      for (let i = loops; i < 4; i++) {
        var tp = [...Array(players.length).keys()]
        for(let j = 0; j < qLimit;j++) {
          count++;
          randomPerson = Math.floor(Math.random()*tp.length);
          var supQ = {...superQ[i]}
          supQ.question = supQ.question.replace("__", players[tp[randomPerson]].name)
          if(i < 2) {
            if(tp.length>1) {
              do {
                var randomPerson2 = Math.floor(Math.random()*tp.length)
              } while(randomPerson == randomPerson2);
              supQ.question = supQ.question.replace("__", players[tp[randomPerson2]].name)
            }else {
              addOnceQ(1);
            }
          }
          sQ.push(supQ);
          tp = tp.splice(randomPerson, 1);
        }
      }
      shuffle(sQ);
      sQ.forEach(q => {
        var nnp = place+(Math.floor(Math.random()*nPlace));
        allQ.splice(nnp,0,q);
        place+=nPlace;
      });

    }
    function shuffle(a) {
      var j, x, i;
      for (i = a.length - 1; i > 0; i--) {
          j = Math.floor(Math.random() * (i + 1));
          x = a[i];
          a[i] = a[j];
          a[j] = x;
      }
      return a;
    }
    function filter(amount) {
      if(gameMode!=2&&fresh===1) {
      var filterpos = 0;
      for(var i = 0; i < amount;i++) {
        if(allQ[i].itchy===0) {
          for(var l = filterpos; l < allQ.length;l++) {
            if(allQ[l].itchy===1) {
              filterpos=l+1;
              var x;
              x = allQ[l];
              allQ[l] = allQ[i];
              allQ[i] = x;
              break;
            }
          }
        } else if(filterpos===i) {
          filterpos++;
        }
      }
      }

    }
    function setNames() {
      var cat = JSON.parse(JSON.stringify(require('./questions/category.json'))).cat 
      var p = [];
      for (var i = 0; i < players.length; i++) {
        p.push([i,1]);
      } 
      allQ.forEach(q => {
        var playerIDs = [];
        if(q.totalP!=0){
          for(var i = 0; i < q.totalP; i++){
              var n = players[selectP()].name;
              playerIDs.push(n);
              q.question = q.question.replace("__", n);
              q.question = q.question.replace("-"+(i+1)+"-", n);
            }
          }
          for (var i = 0; i < p.length; i++) {
            p[i][1]++;
            if(p[i][1]>2) {
              p[i][1]++;
            }
          } 
        q.question = q.question.replace("-k-", cat[Math.floor(Math.random()*cat.length)].category);
        if(q.question.includes("__")) {
          var n = players[selectP()].name;
          playerIDs.push(n);
          q.question = q.question.replace("__", n);
          for (var i = 0; i < p.length; i++) {
            p[i][1]++;
          }
        }
        q.playerID = playerIDs;
      });

      function selectP() {
        pot = []
        for(var i = 0; i < p.length; i++) {
          for(var j = 0; j < p[i][1];j++) {
            pot.push(p[i][0]);
          }
        }
        var rP = pot[Math.floor(Math.random()*pot.length)];
        p[rP][1]=0;
        return rP;
      }
    };
    function addRules(amount) {

      var p = [];
      for (var i = 0; i < players.length; i++) {
        p.push([i,1]);
      } 

      var difference = Math.floor((totalQ)/(amount)*1.5)+2;
      var currentPos = 0;
      var rule = JSON.parse(JSON.stringify(require('./questions/rules.json')));
      for(var i = 0; i < amount/2; i++) {
        var randomRule = Math.floor(Math.random()*rule.rules.question.length);

        var pos1 = currentPos + Math.floor(Math.random()*difference);
        var pos2 = pos1 + Math.floor(difference/2) + Math.floor(Math.random()*difference);

        currentPos+=difference;
        var rules = rule.rules.question[randomRule];
        var rulesbreak = rule.ruleBreaks.question[randomRule];
        if(rules.totalP != 0) {
          for(var i = 0; i < rules.totalP; i++){
              var n = players[selectP()].name;
              rules.question = rules.question.replace("__", n);
              rules.question = rules.question.replace("-"+(i+1)+"-", n);
              rulesbreak.question = rulesbreak.question.replace("__", n);
              rulesbreak.question = rulesbreak.question.replace("-"+(i+1)+"-", n);
          }
          for (var i = 0; i < p.length; i++) {
            p[i][1]++;
          } 
        }
        fixMPos(rules,rule.rules.title,rule.rules.underQ, pos1);
        fixMPos(rulesbreak,rule.ruleBreaks.title,rule.ruleBreaks.underQ, pos2);
        
        rule.rules.question=rule.rules.question.filter((q) => q.id != rule.rules.question[randomRule].id);
        rule.ruleBreaks.question=rule.ruleBreaks.question.filter((q) => q.id != rule.ruleBreaks.question[randomRule].id);
      }
      function selectP() {
        var highestL = [];
        var highV = 0;
        for(var i = 0; i < p.length; i++) {
          if(p[i][1]==highV) {
            highestL.push(p[i][0]);
          } else if(p[i][1]>highV) {
            highestL = [];
            highestL.push(p[i][0]);
            highV = p[i][1];
          } 
        }
        var rP = highestL[Math.floor(Math.random()*highestL.length)];
        p[rP][1]=0;
        return rP;
      }
    }
   
    function addBombs(amount) {
  
      for(var i = 0; i < amount/2;i++) {
        var bombDif = 25;
        var bombs = JSON.parse(JSON.stringify(require('./questions/divQ.json'))).tb;

        var bStart = 1+Math.floor(Math.random()*10);
        var bEnd = (bStart+5)+Math.floor(Math.random()*(bombDif - bStart-5));
    
        allQ.splice(bombDif*i+bStart,0,bombs[0]);
        allQ.splice(bombDif*i+bEnd,0,bombs[1+Math.floor(Math.random()*4)]);
      }
    }
    function fixMPos(q, title, underQ, pos)  {
      q["title"] = title;
      q["underQ"] = underQ;
      allQ.splice(pos,0,JSON.parse(JSON.stringify(q)));
    }
    function fixPos(q, pos)  {
      allQ.splice(pos,0,JSON.parse(JSON.stringify(q)));
    }
  function addMQ(q, title, underQ) {
    if(q.totalP<=players.length) {
      q["title"] = title;
      q["underQ"] = underQ;
      allQ.push(JSON.parse(JSON.stringify(q)));
    } else {
      addOnceQ(1);
    }
  };
  function addQ(q) {
    if(q.totalP<players.length) {
      allQ.push(JSON.parse(JSON.stringify(q)));
    } else {
      addOnceQ(1);
    }
  };


  function removeQ(qArray, id) {
    return qArray.question.filter((q) => q.id != id);
  }

  function freshG() {
    if(fresh===1) {
      var startQ={"question": "Klar for fylla?", "totalP": 0, "itchy": 1, "title": "Start Dram! ","underQ": "Slide til høyre eller trykk på høyre side av kortet for å starte", "id": 666}; 
      allQ.splice(0,0,startQ);
    }
    var endQ={"question": "En runde til kanskje?", "totalP": 0, "itchy": 1, "title": "Spillet er ferdig ","underQ": "Svipe eller trykk for å gå tilbake til hovedmenyen", "id": 666}; 
    allQ.splice(allQ.length,0,endQ);
  }

  /*
  console.log(allQ[1].question);
  for(var i = 0;i <allQ.length;i++) {
    if(allQ[i].title.localeCompare("Regelbrudd")===0||allQ[i].title.localeCompare("Regel")===0) {
      console.log(i +" | "+allQ[i].title+"|"+allQ[i].id);
    }
  }*/
  return allQ;
  
}
function rGame(prevQ, players, gameMode, currentQ) {
  var allQ = [];

  for(var l =0; l <= currentQ; l++) {
    if(stillIG(prevQ[l])) {
      allQ.push(prevQ[l]);
    }
  }
  allQ[0].id= allQ.length-1;
  var resting = findRest();

  var newQ = generateGame(81-allQ.length-resting.length,players,gameMode,0);
  for(var l =0; l<resting.length;l++) {
    newQ.splice(2+Math.floor(Math.random()*4),0,resting[l]);
  }
  newQ.forEach(q => allQ.push(q));
  return allQ;

  function stillIG(q) {
    if(q.totalP>0) {
    
    for(var i = 0; i < q.playerID.length;i++) {
      var rT = 0;
      for(var j = 0; j < players.length;j++) {
        if(q.playerID[i].localeCompare(players[j].name)===0) {
          rT = 1;
          break;
        }
      }
      if(rT===0) {
      return false;
      }
    }
    return true;
    } else {
      return true;
    }
  }
  function findRest() {
    var bombs = JSON.parse(JSON.stringify(require('./questions/divQ.json'))).tb;
    var resting1 =[];
    var stillBomb = 0;
    for(var l =0; l <= currentQ; l++) {
      if(prevQ[l].title.localeCompare("Regel ")===0) {
        resting1.push(prevQ[l].id);
      }
       else if(prevQ[l].title.localeCompare("Timebomb ")===0) {
        stillBomb=1;
      }
      else if(prevQ[l].title.localeCompare("Regelbrudd ")===0) {
        resting1 = resting1.filter((q) => q != prevQ[l].id);
      }
      else if(prevQ[l].title.localeCompare("Boom! ")===0) {
        stillBomb=0;
      }
    }
    var returnQ = [];
    if(stillBomb===1) {
      returnQ.push(bombs[1+Math.floor(Math.random()*(bombs.length-1))]);
    }
    for(var i = 0; i < resting1.length;i++) {
      for(var l = currentQ; l <prevQ.length;l++) {
        if(prevQ[l].title.localeCompare("Regelbrudd ")===0
        && prevQ[l].id===resting1[i]) {
          if(stillIG(prevQ[l])) returnQ.push(prevQ[l]);
          break;
        }
      }
    }
  
   return returnQ;
  }
}
export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      screen: 0,
      gameMode: 0,
      CQ: [],
    players: [],
    loaded: false,
    currentQ: 0
  }
  }

  async componentDidMount() {
    await Font.loadAsync({
      'b': require('./assets/fonts/bangers.ttf'),
      'u': require('./assets/fonts/patua.ttf'),
    })
    this.setState({loaded:true});

  }

  addPs = (pName) => {
    this.setState({
      players: [...this.state.players, 
        {
          key: Math.random().toString(), 
          name: pName
        }]
    })
  }
  currentQuestion = (qr) => {
    this.setState({
      currentQ: qr
    })
  }
  removePlayer = pId => {
    this.setState({ 
      players: (this.state.players.filter((p) => p.key !== pId ))
    })
  };
  switchSC = (sc) => {
    this.setState({ 
      screen: sc
    })
  };
  selectGameMode = (gm)=> {
    this.setState({
        gameMode: gm,
        screen:2,
        currentQ: 0,
        CQ: generateGame(80,this.state.players,gm,1)
    });
    duplicateCount = 0
    console.log(generateGame(80,this.state.players,gm,1))
    /*for (var i = 0; i < 6; i++) {
      generateGame(80,this.state.players,gm,1)
    } */
  }
  
 /* async makeGame(gm) {
    await this.setState({CQ: generateGame(80,this.state.players,gm,1)});
    this.setState({loaded:true});
  } */

  refreshGame = () => {
    this.setState({
        CQ: rGame(this.state.CQ,this.state.players,this.state.gameMode, this.state.currentQ),
        screen:2
    });
    this.setState({
      currentQ : this.state.CQ[0].id
    });
  }

  render() {
    let content;
    switch(this.state.screen) {
      case (0):
        content = <PlayerScreen ps={this.state.players} addP={this.addPs} removeP={this.removePlayer} gM={this.switchSC}/>;
        break;
      case (1): 
        content = <GameModeScreen wGameMode={this.selectGameMode} back={this.switchSC}/>
        break;
      case 2: 
        content = <GameScreen q={this.state.CQ} gM={this.switchSC} qr={this.currentQuestion} curQ={this.state.currentQ}/>
        break;
      case (3):
        content = <ADGScreen ps={this.state.players} addP={this.addPs} removeP={this.removePlayer} gM={this.refreshGame}/>;
      break;
    }
    if(this.state.loaded) {
      return (
        <View style={styles.container}>
          <StatusBar hidden />
          {content}
        </View>
      );
    } else {
      return (
        <View style={styles.fill}>
          <StatusBar hidden />
          {/*<Text style={styles.loadTitle}> Laster inn </Text>*/}
          <Image style={{width: 100, height: 100, margin: 24}} source={require('./assets/logo.png')}/>
          <ActivityIndicator size="large" color='white' />
        </View>
      );
    }
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  loadTitle: {
    fontFamily:'b',
    includeFontPadding: false,
    fontSize: 32,
    color: 'white'
  },
  fill: {
    flex: 1,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: 'center'
  }
});
