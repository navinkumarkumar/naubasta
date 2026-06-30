/*   Last Update date  17 Jan 2005 */  
dbName = new Array() ;
dbAge  = new Array() ;
currDate = new Date() ;
ImagePath = 'images\\'  ;
AlbumPath  = 'album\\'   ;
function Person( desc)
{
  var tabReg  = new RegExp('\\t||\\n', 'g') ;
  desc = desc.replace(tabReg,'') ;
  var descSplit = desc.split(',') ;
  var tempComments = ''  ;
if ( descSplit.length < 7 )
    {
     alert( 'Mandatory items not defined in ' + desc ) ;
    }
  this.id = Number(descSplit[0]) ;
  if (!(this.id >=0  && this.id < 1000 ))
     alert(' id in ' + desc  + ' not valid') ;
  this.name  = descSplit[1] ;
  dbName[db.length] = descSplit[1] + '||' + this.id ;
  var tabReg  = new RegExp('\\s', 'g') ;
  this.nickname = descSplit[2].replace(tabReg,'') ;
  this.sex = descSplit[3].replace(tabReg,'') ;
  this.father = Number(descSplit[4]) ;
  if ( validateId( this.father) == false ) 
     alert(' Father\'s id in ' + desc + ' not valid ') ;
  this.mother = Number(descSplit[5]) ;
  if  ( validateId( this.mother) == false ) 
      alert(' Mother\'s id in ' + desc  + ' not valid') ;
  this.spouse = (descSplit.length >= 7 ) ?   Number(descSplit[6]) : 0;
  this.dob   = (descSplit.length >= 8 && descSplit[7] != ''  ) ?  new Date(descSplit[7]) : null   ;
 if  (this.dob != null  && (this.dob.getFullYear() > 0) )
  dbAge[dbAge.length]  =  this.dob.getFullYear().toString() +  
      ((this.dob.getMonth() < 10) ? ('0' + this.dob.getMonth().toString()) : this.dob.getMonth() )
    +  ((this.dob.getDate() < 10) ? ('0' + this.dob.getDate().toString()) : this.dob.getDate()  )
        +   '||' +   this.id  ; 
  this.dom   = (descSplit.length >= 9 ) ? new Date(descSplit[8]) : null  ;
  this.dod   = (descSplit.length >= 10 ) ?  descSplit[9] : ''  ;
  for ( i = 10 ; i < descSplit.length ; i++ ) 
       tempComments = tempComments +  descSplit[i]  + ',' ;
  this.comments =  tempComments.substr(0,(tempComments.length -1 )) ;
}

db = new Array() ;
db[0] = new  Person("0	,null			,null		,,0 ,0 ,0") ;

function validateId( pid1) 
{
 if ( pid1 == 0 ) return true ;
 for ( i = 0 ; i < db.length ; i++ )
    if (pid1 == db[i].id )
       return true    ;
 return false ;
}

function Relation( desc )
   {
      var tabReg  = new RegExp('\\s', 'g') ;
	desc = desc.replace(tabReg,'') ;
      var descSplit = desc.split(',') ;
      var pcode = descSplit[0] ;
      pcode = pcode.replace(/Father/g, '1') ;
 	pcode = pcode.replace(/Mother/g, '2')  ;
 	pcode = pcode.replace(/Brother/g, '3') ;
 	pcode = pcode.replace(/Sister/g, '4') ;
 	pcode = pcode.replace(/Wife/g, '5') ;
 	pcode = pcode.replace(/Husband/g,'6') ;
 	pcode = pcode.replace(/Son/g, '7') ;
 	pcode = pcode.replace(/Daughter/g, '8') ;
      var codeSplit = pcode.split('or') ;
      var aReg  = new RegExp('\\D','g') ;
      for ( i = 0 ; i < codeSplit.length ; i++ )
          {
 	  if  (aReg.test(codeSplit[i]))
              { 
       	        alert('Relation ' + descSplit[0] + ' is not valid') ; 
               break ;
              }
          }
      this.relation = codeSplit ;
      this.name = descSplit[1] ;
      this.spouseName = descSplit[2] ;
      this.disp = (descSplit.length >= 4 ) ?  descSplit[3] : 'list'  ;
      
   }
/*  			Images   
 The application supports images in jpeg format. To put a image, rename the image file to 
 person's id, with the extension '.jpg'. For example image file name for id 31 would be
 '31.jpg'.
 Album images( maximum 12) can be put as:  31a1.jpg , 31a2.jpg ....  31a12.jpg.
 Family photos are named as 'fam1.jpg' , 'fam2.jpg' ...
 Individual Images are stored in 'images' folder and album photos in 'album' folder. Family
 photos are put in base folder.
*/
/*     Email
  Email button on HTML page for a particular person. In the comments field of a person
  include tag 'Email:'. Enter full email address after 'Email:'
*/ 

function checkRel( pcode, pi )
{
 if ( pi  == 0 || id == 0 || pi == id || db[id].mother == pi || db[id].spouse == pi )
     return false ;
 var relSymbol  ;
 var equation  ;
 var parent   ;
 var lastRel  ;
 for ( coden = 0 ; coden < pcode.length ; coden++ )
 {
   //code = codeSplit[coden] ;
   code = pcode[coden] ;
   lastRel = code.substr(code.length -1,1) ;
   firstRel = code.substr(0,1) ;
   if ( ( ( lastRel == '1' || lastRel == '2' || lastRel == '5' || lastRel == '6') && 
          db[pi].spouse == 0 )  || ( ( lastRel == '3' || lastRel == '4' || lastRel == '7'
          || lastRel == '8' ) && db[pi].father == 0)  ||( getRelSex(lastRel) != db[pi].sex ) )
       return false ;
   if (( ( firstRel == '1' || firstRel == '2' || firstRel == '3' || firstRel == '4') &&
         db[id].father == 0 )  ||  (( firstRel == '5'  || firstRel == '6' || firstRel == '7'
         || firstRel == '8' ) && db[id].spouse == 0) )
         continue ; 
   var preStr = id ;
   var posStr  = pi  ;
   var sexStr  = ''    ;
   for ( pos = code.length - 1 ; pos >= 0 ; pos-- )
      {
	 relSymbol = code.substr(pos,1) ;
	 if ( relSymbol == '1' || relSymbol == '2' || relSymbol == '5' || relSymbol == '6' )
	      break ;
	 ns = (pos == 0 ) ? ( ( db[id].sex == 'M') ? 1 : 2) : code.substr(pos-1,1)  ;
	 parent =  ( ns == 1 || ns == 3 || ns == 6 || ns == 7) ? 'father' : 'mother'  ; 
	 switch(relSymbol)
	 {
	   // brother
	  case '3': sexStr += ' && db[' + posStr + '].sex == \'M\'' ;
		    posStr = 'db[' + posStr + '].father' ;
		    break ;
		  // sister 
	  case '4' : sexStr += ' && db[' + posStr + '].sex == \'F\'' ; 
		     posStr = 'db[' + posStr + '].father' ;
		     break ;
	  case '7': //sons
		  sexStr  += ' && db[' + posStr + '].sex == \'M\'' ;  
		  posStr = 'db[' + posStr + '].' + parent ;
		  if ( code.length > 1 )
		      sexStr += ' && db[' + pi + '].' + ( (db[id].sex == 'M') ? 'father' : 'mother') + '!=  ' + id  ;
		  break ;
	  case '8' : // daughter
		  sexStr  += ' && db[' + posStr + '].sex == \'F\'' ;
		  posStr = 'db[' + posStr + '].' + parent ;


		  if ( code.length > 1 )
		      sexStr += ' && db[' + pi + '].' + ( (db[id].sex == 'M') ? 'father' : 'mother') + '!=  ' + id  ;
		  break ;
	  default: break ;
	}
     }
     for ( pos = 0  ; pos < code.length   ; pos++ )
      {
	 relSymbol = code.substr(pos,1) ;
	 if ( relSymbol == '7' || relSymbol == '8'  )
	      break ;
	 switch(relSymbol)
	 {
	  case '1': // father 
		   preStr = 'db[' + preStr + '].father' ;  break ;
		  // mother
	  case '2': preStr = 'db[' + preStr + '].mother' ; break ;
		  // brother
	  case '3':  //sexStr += ' && db[' + posStr + '].sex == \'M\'' ;
		     sexStr += ' && ' +  preStr  + ' != '  + pi  ;
		     preStr = 'db[' + preStr + '].father' ;
		     break ;
		  // sister 
	  case '4' : //sexStr += ' && db[' + posStr + '].sex == \'F\'' ; 
		     sexStr += ' && ' +  preStr  + ' != '  + pi  ;
		     preStr = 'db[' + preStr + '].father'  ; 
		     break ;
	  case '5'  : // wife
		    sexStr += ' &&  db[' + preStr + '].sex == \'M\'' ;  
		    preStr = 'db[' + preStr + '].spouse'  ; break ;
	  case '6'  : // husband
		    sexStr += ' && db[' + preStr + '].sex == \'F\'' ; 
		    preStr = 'db[' + preStr + '].spouse'  ; break ;
	  default: break ;
	}
     }
     equation = '(' + preStr + ' == '  + posStr + ' && (' +  posStr + ' > 0 ))' ;
     if ( sexStr.length > 0 ) 
	 equation = equation +  sexStr   ;
     if ( eval(equation) )
	 return true ;
     
  }
     /*if ( tcode == 'SonSonSon or DaughterSonSon' & pi == 73 )
	alert(pcode + ' ' + finalEquation) ; */
    return false ; 
} 

/*  The id for which relatoins are displayed on down load */     
var id = 1 ;
var colcount = 0 ;
/*
document.captureEvents(event.LOAD) ;
document.onLoad  = onLoadHandler ;
function onLoadHandler()
{
  parent.window.title = 'Family Database of ' + db[1].name + ' and ' + db[2].name ;

}
*/

function yearDiff(adate)
{
  return( currDate.getFullYear() - adate.getFullYear() )
}

function findAge(adate)
{
  age = currDate.getFullYear() - adate.getFullYear()  ;
  if  ( ( currDate.getMonth() <  adate.getMonth() )  || 
                       ( ( currDate.getMonth() ==  adate.getMonth() ) && (currDate.getDate() <  adate.getDate() ) ) )
          age = age - 1 ; 
        
  return age ;
}


function getMonthStr(amon)
{
 var month;
 switch( amon)
 {
   case 0: month = 'Jan' ; break ;
   case 1: month = 'Feb' ; break ;
   case 2: month = 'Mar' ; break ;
   case 3: month = 'Apr' ; break ;
   case 4: month  = 'May' ; break ;
   case 5: month = 'Jun' ; break ;
   case 6: month = 'Jul' ; break ;
   case 7: month = 'Aug' ; break ;
   case 8: month = 'Sep' ; break ;
   case 9: month = 'Oct' ; break ;
   case 10: month = 'Nov' ; break ;
   case 11: month = 'Dec' ; break ;
}
   return month ;
}
function displaylist(phow)
{
  listDoc = parent.ListFrame.document  ;
  detailDoc = parent.DetailFrame.document ;
  if (phow !=  'faces' )
   {
    listDoc.open() ;
    listDoc.writeln('<font size=3><a href=mail.htm target="_blank">Feedback</a>' ); 
    listDoc.writeln('<body bgcolor=pink><table border=1 width=160><tr><td><font size=2>Members ' +
                  '<a href=javascript:parent.DataBase.displaylist(\'id\')>id</a>&nbsp&nbsp' +
                  '<a href=javascript:parent.DataBase.displaylist(\'names\')>name</a>&nbsp&nbsp' +
                  '<a href=javascript:parent.DataBase.displaylist(\'ageup\')>ageUp</a>&nbsp&nbsp' +
                  '<a href=javascript:parent.DataBase.displaylist(\'agedn\')>ageDown</a></td></tr>' +
                  '<tr><td><font size=2><a href=javascript:parent.DataBase.displaylist(\'bday\')>Bdays</a>&nbsp&nbsp&nbsp' +
                  '<font size=2><a href=javascript:parent.DataBase.displaylist(\'mar\')>Mar\'Aniver</a></td></tr>' +
                  '<tr><td><font size=2><a href=javascript:parent.DataBase.displaylist(\'album\')>Family Photos</a>&nbsp&nbsp&nbsp' + 
                  '<font size=2><a href=javascript:parent.DataBase.displaylist(\'email\')>Emails</a></td></tr>' + 
 		  '<tr><td><font size=2><a href=javascript:parent.DataBase.displaylist(\'stats\')>Stats</a>&nbsp&nbsp&nbsp' +
                  '<font size=2><a href=javascript:parent.DataBase.displaylist(\'faces\')>Faces</a></td></tr>' + 
                  '</table>')  ;
    listDoc.writeln('<font size=2>')      ;
   }     
  switch(phow)
  {
   case 'id' :
      listDoc.writeln('<OL>') ;
      for( i = 1 ; i < db.length ; i++ )
	     listDoc.writeln('<LI ><A HREF=javascript:parent.DataBase.setid(' + db[i].id + ') >' 
			     +   fullname(db[i].id) + '</A></LI>') ;
      listDoc.writeln('</OL></body>') ;
      listDoc.close() ;
      break ;
  case 'names':
       listDoc.writeln('<UL>') ;
       for( i = 1 ; i < dbName.length ; i++ ) 
          {
           idx1 = dbName[i].indexOf('||') ;
           vid = dbName[i].substr(idx1+2, dbName[i].length - idx1)   ;
           listDoc.writeln('<LI><A HREF=javascript:parent.DataBase.setid(' + db[vid].id + ')>' 
			     +   fullname(db[vid].id) + '</A></LI>') ;
          }
       listDoc.writeln('</UL></body>') ;
       listDoc.close() ;
       break ;
  case 'agedn':
       listDoc.writeln('<UL>') ;
       for( i = 0 ; i < dbAge.length ; i++ ) 
          {
           idx1 = dbAge[i].indexOf('||') ;
           vid = dbAge[i].substr(idx1+2, dbAge[i].length - idx1)   ;
           listDoc.writeln('<LI>' + memberLink(vid) + '(' + findAge(db[vid].dob) + ')' + '</LI>') ; 
           }
       listDoc.writeln('</UL></body>') ;
       listDoc.close() ;
       break ;
  case 'ageup':
       listDoc.writeln('<UL>') ;
       for( i = dbAge.length - 1 ; i >= 0 ; i-- ) 
          {
           idx1 = dbAge[i].indexOf('||') ;
           vid = dbAge[i].substr(idx1+2, dbAge[i].length - idx1)   ;
           listDoc.writeln('<LI>' + memberLink(vid) + '(' + findAge(db[vid].dob) + ')' + '</LI>') ; 
          }
       listDoc.writeln('</UL></body>') ;
       listDoc.close() ;
       break ;
  case 'bday' :
       listDoc.writeln('Close Birthdays') ;
       strDoc = '<UL>' ;
       for( i = 0 ; i < db.length ; i ++ )
       {
        if ( db[i].dob != null && Math.abs(( (currDate.getMonth() * 30.5) + currDate.getDate() )
             - ((db[i].dob.getMonth() * 30.5) + db[i].dob.getDate()))  <= 30 )
           strDoc += '<LI>'  + memberLink(db[i].id)  +  '(' + yearDiff(db[i].dob) + ') ' +
                            db[i].dob.getDate() + ' ' + getMonthStr(db[i].dob.getMonth()) ;
       }
        strDoc += '</UL>' ;
        strDoc += '</UL></body>';
        listDoc.writeln(strDoc) ;
        listDoc.close() ;
        break ;
 case 'mar' :
       listDoc.writeln('Close Marriage Anniversaries') ;
       strDoc = '<UL>' ;
       for( i = 0 ; i < db.length ; i ++ )
         {
            if (( db[i].dom != null && Math.abs(( (currDate.getMonth() * 30.5) + currDate.getDate() )
             - ((db[i].dom.getMonth() * 30.5) + db[i].dom.getDate()))  <= 30 ) && db[i].sex == 'M' )
              strDoc += '<LI>'  + memberLink(db[i].id)  +  ' & ' +  memberLink(db[i].spouse) + ' ' +
              '(' + yearDiff(db[i].dom) + ') ' +
              db[i].dom.getDate() + ' ' + getMonthStr(db[i].dom.getMonth()) ;
          }
        strDoc += '</UL>' ;
        strDoc += '</UL></body>';
        listDoc.writeln(strDoc) ;
        listDoc.close() ;
        break ;
 case  'album' : 
       listDoc.writeln('<table>') ;
       for ( i=1 ; i <= 12 ; i++ ) 
	    listDoc.write('<tr><td><a href=fam' + i + '.jpg target=_blank>'+ 
                       '<IMG width=100 src=' + 'fam' + i + '.jpg border=2></a></td></tr>')  ;
           
       listDoc.writeln('</table></UL></body>') ;
       listDoc.close() ;
       break ;
case 'stats' :
        noMores = new Array() ;
        var maleMembers = 0 ;
        var femaleMembers = 0 ;
        var eldest  = 0 ;
        var eldLive = 0 ;
        var youngest  = 0 ;
       for ( i=1 ; i < db.length ; i++ )
         {
          if (db[i].dod.length > 0 )
              {
                noMores[noMores.length] = db[i].id ;
              }
          if ( db[i].sex == 'M' )
                maleMembers++ ;
          else
                femaleMembers++ ;
          if (( db[eldLive].dob == null ) || ( db[eldLive].dod.length > 0 ) ||
		((db[i].dod.length == 0 ) && ( db[i].dob  !=  null ) &&
 	         ( db[i].dob.getTime() < db[eldLive].dob.getTime() ) ))
                eldLive =  db[i].id ;
          if ( ( db[youngest].dob == null ) || (( db[i].dob != null) &&
                          ( db[i].dob.getTime() > db[youngest].dob.getTime() ) ))
                youngest  = db[i].id ;
          if ( ( db[eldest].dob == null ) || (( db[i].dob != null) &&
                          ( db[i].dob.getTime() < db[eldest].dob.getTime() ) ))
                eldest  = db[i].id ;
         }     
         strDoc = '<UL>' ;
         strDoc += '<LI>Members ' + '</LI>' ;
         strDoc += '<UL>' ;
        strDoc += '<LI> Total ' + (db.length - 1 ) ;
        strDoc += '<LI> No Mores ' + noMores.length  ;
        strDoc += '<LI> Males ' + maleMembers  ;
        strDoc += '<LI> Females ' + femaleMembers  ;
        strDoc += '</UL>' ;
        strDoc += '<LI>Eldest'  +  '</LI>' ;
        strDoc += '<UL>' ;
        strDoc += '<LI>'  + memberLink(eldest)  ;
        strDoc += '</UL>' ;
        strDoc += '<LI>Eldest(Live) ' + '</LI>'  ;
        strDoc += '<UL>' ;
        strDoc += '<LI>'  + memberLink(eldLive)  ;
        strDoc += '</UL>' ;
        strDoc += '<LI>Youngest'    + '</LI>'  ;
        strDoc += '<UL>' ;
        strDoc += '<LI>'  + memberLink(youngest)  ;
        strDoc += '</UL>' ;
        strDoc += '<LI>No Mores' + '</LI>'  ;
        strDoc += '<UL>' ;
        for ( i = 0 ; i < noMores.length; i ++ )
              strDoc += '<LI>'  + memberLink( noMores[i])  ;
        strDoc += '</UL>' ;
        strDoc += '</UL></body>';
        listDoc.writeln(strDoc) ;
        listDoc.close() ;
        break ;
case   'email' : 
        strDoc = '<UL>' ;
        for ( i = 1 ; i < db.length ; i++ )
        {
          var cs = db[i].comments ;
          var idx = cs.indexOf('Email:') ;
          if ( idx == -1 )
          ;
          else
          {
            var addr = cs.substr(idx + 6, cs.length)  ;
            idx = addr.indexOf(' ') ;
            addr = addr.substr(0,idx) ;
            strDoc += '<LI>'+ db[i].name + ' '  + addr
            
         }
       }
       strDoc += '</UL></body>';
       listDoc.writeln(strDoc) ;
       listDoc.close() ;
       break ;
case  'faces':
            detailDoc.open() ;
            detailDoc.writeln('<table>') ;
            for ( i=1 ; i < db.length ; i++ ) {
             if  ((i %3) == 1 )
                 detailDoc.write('<TR>') ; 
                 detailDoc.write('<td><a href=' + ImagePath + i + '.jpg target=_blank>' + 
                          db[i].name + '<img name=aImage src=./images/' + i + 
                          '.jpg width=100 align=left suppress=true ' + 
         	          ' onError="javascript:parent.DataBase.blankImage(this)"></a></td>') ; 
                 if ((i %3) == 0 )
                      detailDoc.write('<TR>') ; 
             }
            detailDoc.writeln('</table>') ;
            detailDoc.close() ;
       break ;
default: break ;
  }
  }
function memberLink( aid )
{
 return ('<A HREF=javascript:parent.DataBase.setid(' + db[aid].id + ')>' 
			     +   fullname(db[aid].id) + '</A>' ) ;
}
function setid( pid )
{
  id = pid ;
  writeDetaildocument () ;
}
function album()
{
  detailDoc = parent.DetailFrame.document  ;
  //window.detailDoc.open("", "_self") ;
  detailDoc.writeln('<H2> Photo Album of ' + db[id].name + '</H2>' ) ;
  detailDoc.writeln('<TABLE BORDER cellpadding=2 cellspacing=10 bgcolor=white ><TR>') ;
  for ( i=1 ; i <= 12 ; i++ ) {
	detailDoc.write('<TD><a href=' + AlbumPath + id + 'a' + i + '.jpg target=_blank>' +
			'<IMG width=150 src=' + AlbumPath + id + 'a' + i + '.jpg border=2></a></TD>')  ;
	if ( (i%3) == 0 )
	    detailDoc.writeln('</TR><TR>') ;
	}
  detailDoc.writeln('</TR></TABLE>') ;
  detailDoc.close() ;
}
function descedants( )
{
 descs = 0 ;
for ( i = 1 ; i < db.length ; i++ )
{
 tpi = i ;              
 while(1)
 {
   if ( db[tpi].father == 0 && db[tpi].mother == 0 ) break ; ;
   if ( db[tpi].father == id || db[tpi].mother == id ) { descs++ ; break  ; }
   tpi = ( db[db[tpi].father].father == 0 ) ? db[tpi].mother : db[tpi].father ;
 }
 }
}

function getRelSex( aRel)
{
 var aSex ; 
switch(aRel)
{
 case '1': aSex = 'M' ; break ;
 case '2': aSex = 'F' ; break ;
 case '3': aSex = 'M' ; break ;
 case '4': aSex = 'F' ; break ;
 case '5': aSex = 'F' ; break ;
 case '6': aSex = 'M' ; break ;
 case '7': aSex = 'M' ; break ;
 case '8': aSex = 'F' ; break ;
}
 return aSex ;
}	

function relations()
{
 var lastDisp = 'XXX' ;
 var flagArray = new Array(db.length) ;
 descs = 0 ;
 for ( ir = 0 ; ir < rel.length ; ir++ )
  {
    results = new Array() ;
    for ( i = 1 ; i < db.length ; i++ )
       {
	if ( ( id == i )  ||  (flagArray[i] == 'S')   )               continue ;
	if (  checkRel( rel[ir].relation , i) )
	  {
	     results[results.length] =  i ;
	     flagArray[i] = 'S' ;
	     if (rel[ir].disp == 'table') break ;
	  }
       }
       if ( results.length > 0 )
	{
	  if  ( rel[ir].disp == 'table' )
	      {
		if ( lastDisp != rel[ir].disp  )
		  detailDoc.writeln('<TABLE BORDER cellpadding=2 cellspacing=1 bgcolor=cyan><TR>') ;
		writetabrec( results[0], rel[ir].name, rel[ir].spouseName) ;
		tableFirst = false ;
	      }
	  if  ( rel[ir].disp == 'list' )
	     {
	      if ( lastDisp != rel[ir].disp )
		{
		 detailDoc.writeln('</TR></TABLE>') ; colcount = 0 ;
		 detailDoc.writeln('<TABLE BORDER cellpadding=2 cellspacing=1 bgcolor=yellow><TR>') ;
		}
	      writelists( results, rel[ir].name, rel[ir].spouseName) ;
	     }
	  lastDisp = rel[ir].disp ;
	}
  }  
 detailDoc.writeln('</TR></TABLE>') ;
}

function fullname( idn)
{
var tname ;
  tname =  db[idn].name   ;
  if ( db[idn].nickname != "" )
      tname = tname + '( ' + db[idn].nickname + ' )' ;
  if ( db[idn].dod.length > 0 ) 
      tname = '<FONT COLOR=RED><I>' + tname + '</I></FONT>' ;
  return tname ;
}
function writetabrec(idn, desc1, desc2)
{
if ( idn == 0 )
    return ;
detailDoc.writeln('<TD WIDTH = 100>' + desc1 + '</TD><TD WIDTH=250><A HREF=javascript:parent.DataBase.setid('+ idn + ')>' + fullname(idn) + '</A></TD>') ;
colcount++ ;
if ( colcount >= 2 )
   {
     parent.DetailFrame.document.writeln('</TR>') ;
     colcount = 0  ;
     detailDoc.writeln( '<TR>') 
   }

if (( db[idn].spouse  > 0 ) && desc2.length > 0 )
     {
       detailDoc.writeln('<TD WIDTH = 100>' + desc2 + '</TD><TD WIDTH=250><A HREF=javascript:parent.DataBase.setid('+ db[idn].spouse + ')>'
			       + fullname(db[idn].spouse) + '</A></TD>') ;
       colcount++ ;
     }
if ( colcount >= 2 )
   {
     detailDoc.writeln('</TR>') ;
     colcount = 0  ;
     detailDoc.writeln( '<TR>') 
   }
}
function writelists(arr, desc1, desc2)
{
 if ( arr.length == 0 )
    return ;
 detailDoc.writeln('<TD WIDTH= 400><UL><LI>' + desc1 + '</LI><UL>') ;
 for ( i =0 ; i < arr.length ; i ++ )
     {
	detailDoc.writeln('<LI><font size=2>' + memberLink(db[arr[i]].id) ) ;
	if ( db[arr[i]].spouse > 0 )
	   detailDoc.writeln('<UL><LI>' + desc2 + ':' + memberLink(db[arr[i]].spouse) + '</LI></UL>') ;
     }
 detailDoc.writeln('</UL></TD></UL>') ;
 if ( ++colcount  >= 2 )
     {
      detailDoc.writeln('</TR>') ;
      colcount = 0 ;
     }
}
function writemail( )
{
  var addr ;
  var cs = db[id].comments ;
  var str1 ;
  var idx = cs.indexOf('Email:') ;
  if ( idx == -1 )
      ;
  else
     {
      addr = cs.substr(idx + 6, cs.length)  ;
      idx = addr.indexOf(' ') ;
      addr = addr.substr(0,idx) ;
      detailDoc.writeln( '<FORM>') ;
      str1 = '<A href=' + '\"mailto:' + addr + '\'\" >' + addr + '</A>' ; 
      detailDoc.writeln(str1) ;
     }
  idx = cs.indexOf('http://') ;
  if ( idx == -1 )
      return ;
  else
     {
      addr = cs.substr(idx, cs.length)  ;
      idx = addr.indexOf(' ') ;
      addr = addr.substr(0,idx) ;
      str1 = '<A href=' + addr + '> MoreInfo' + '</A>'  ;
      detailDoc.writeln(str1) ;
     }
}

function blankImage(theImage)
{
  //alert('inside blankImage') ;
  theImage.width = 0 ;
  theImage.height = 0 ;
}
function tree()
{
  detailDoc = parent.DetailFrame.document  ;
  //detailDoc.open("", "_self") ;
  detailDoc.open() ;
  var upTree = new Array()   ;
  var genColor = ["aqua", "antiquewhite",  "azure", "beige"] ;
  var colorCnt = 0 ;
  var base = id ;
  upTree[0] = id ;
  while(1)
  {
    base = (db[db[base].father].father == 0 ) ?  db[base].mother : db[base].father  ;
    if (base == 0 ) break ;
    upTree[upTree.length] = base ;
   }
detailDoc.writeln('<H2>Family tree of ' + db[id].name + '</H2>' ) ;
for ( ht = upTree.length -1 ; ht >= 0   ; ht-- )
     {
       detailDoc.writeln('<CENTRE><BR><TABLE BORDER align=center cellpadding=3 cellspacing=5 bgcolor=silver>') ;
       sName = ( ht == 0) ? ' ' : db[db[upTree[ht]].spouse].name   ;
       detailDoc.writeln('<TR><TD>' + db[upTree[ht]].name + '</TD><TD>' + sName +
		      '</TD></TR></TABLE>') ;
     }
detailDoc.write('<BR>') ;
var loTree = new Array() ;
loTree[0] = new Array() ;
loTree[0][0] = id ;
fSize = 2 ;
while( loTree.length > 0 )
{
 rcnt = 0 ;
 var tempLo = new Array() ;
 for ( i = 0 ; i < loTree.length ; i++ )
   {
     for ( j = 0 ; j < loTree[i].length ; j++ )
      {
	lastJ = -1   ;
	ch = loTree[i][j] ;
	for ( ci = 1 ; ci < db.length ; ci++ ) 
	if ( db[ci].father == ch || db[ci].mother == ch )
	       {
		if (lastJ != j ) { tempLo[rcnt++] = new Array() ;  }
		tempLo[rcnt-1][tempLo[rcnt -1].length] = db[ci].id ;
		lastJ = j ;
	       }
	lastJ = j ; 
     }
    }
 if ( tempLo.length > 0 )
	{
	   cellSpac = ( 200/ tempLo.length) * 0.2 ;
	   detailDoc.write('<TABLE border cellpadding=2 cellspacing=' + cellSpac+ ' bgcolor=' + genColor[colorCnt++] + '><TR><TD>') ;
	   for ( r = 0 ; r < tempLo.length ; r++ )
	     {
	      detailDoc.write('<TABLE border cellspacing=5><TR>') ;          
	      for( c = 0 ; c < tempLo[r].length ; c++ ) {
		 detailDoc.write('<td><font size=' + fSize + '>' + db[tempLo[r][c]].name + '</td>') ; }
	      detailDoc.write('</tr></table></td><td>') ;
	     } 
	   detailDoc.write('</TR></TABLE>') ;
	   fSize -= 1 ;
	}  
 loTree = tempLo ;
 detailDoc.write('<BR>') ;
}  
detailDoc.close() ;
    
}
function getDateString( aDate, aFlag  )
{
  var tempString = '' ;
  var aDay   = aDate.getDate() ;
  var aYear  = aDate.getFullYear()  ;
  if ( aDay > 0 )
       tempString = aDay + '-'  ;
  tempString = tempString + getMonthStr( aDate.getMonth() )    ;
//  if ( aFlag == 'M' || ( ( currDate.getFullYear()  - aDate.getFullYear() ) < 30 )  ||
//             ( ( currDate.getFullYear()  - aDate.getFullYear() ) > 60  ) )
//            tempString = tempString + '-' + aYear  ;
//  else
//          tempString = tempString + '-19XX'   ;
  return tempString ;
}

function writeDetaildocument()
{
 //alert('Write Detail Document') ;
 detailDoc = parent.DetailFrame.document ;
 detailDoc.open();
 var strText = "" ;
// Header Details
 strText += '<a href=' + ImagePath + id + '.jpg target=_blank>' + '<img name=aImage src=' + ImagePath + id + 
  '.jpg width=200 align=left suppress=true ' + 	' onError="javascript:parent.DataBase.blankImage(this)">' ; 
 strText += '<FONT size=5 color=magenta> ' + fullname(id) + '</font>' ;
 if (  db[id].dob  != null &&  db[id].dob.getDate() > 0   )
      strText += '<B> ' + getDateString(db[id].dob, 'A') ;
 if ( db[id].dod.length > 0 )
      strText +=  ' to ' + db[id].dod  +  '</B></TD>' ;
 else
      strText +=  '</B>' ;
 //strText += '</TR></TABLE>' ; 
 strText += '<FORM><font size=2><input type=button value="Album"' +  
		     ' onClick="javascript:parent.DataBase.album()">'  ;
 strText += '<input type=button value="Tree"' +  
		     ' onClick="parent.DataBase.tree()"></font></FORM>'  ;
detailDoc.writeln(  strText) ;
 //strText += '<TABLE BORDER cellpadding=2 cellspacing=1 bgcolor=silver><TR><TD>'
 strText = '' ;
 if ( db[id].spouse > 0 ) 
	 strText += 'Married with ' + memberLink(db[id].spouse)   ;
 if (  db[id].dom  != null &&  db[id].dom.getDate() > 0   )
     strText +=  ' on ' + getDateString(db[id].dom, 'M') ;
 descedants() ;
 if ( descs > 0 )
      strText += ', has ' + descs  + ' descendants. '    ; 
 if ( db[id].comments.length > 0 )
      strText +=  db[id].comments ;
 if ( strText.length > 0 ) {
    detailDoc.writeln(  '<TABLE BORDER cellpadding=2 cellspacing=1 bgcolor=silver><TR><TD>') ;
    strText += '</TD></TR></TABLE>'  ;
    detailDoc.writeln(  strText) ;
   }

 //writemail() ;
 //
colcount = 0 ;
relations()
detailDoc.writeln('</TR></TABLE>')   ;
detailDoc.close() ;
}


