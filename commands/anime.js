const _0x1ef5a6=_0x388c;(function(_0x20b78d,_0x7d85ca){const _0x5c80a5=_0x388c,_0xa31c4d=_0x20b78d();while(!![]){try{const _0x3f6cf5=-parseInt(_0x5c80a5(0x104))/0x1*(-parseInt(_0x5c80a5(0x11b))/0x2)+-parseInt(_0x5c80a5(0x11c))/0x3+parseInt(_0x5c80a5(0xf8))/0x4*(-parseInt(_0x5c80a5(0xf4))/0x5)+-parseInt(_0x5c80a5(0x103))/0x6+-parseInt(_0x5c80a5(0x11a))/0x7*(-parseInt(_0x5c80a5(0x112))/0x8)+-parseInt(_0x5c80a5(0xfa))/0x9*(-parseInt(_0x5c80a5(0x11d))/0xa)+-parseInt(_0x5c80a5(0xfd))/0xb*(-parseInt(_0x5c80a5(0x102))/0xc);if(_0x3f6cf5===_0x7d85ca)break;else _0xa31c4d['push'](_0xa31c4d['shift']());}catch(_0x185b7b){_0xa31c4d['push'](_0xa31c4d['shift']());}}}(_0x4323,0xca1e0));function _0x4323(){const _0x26de54=['https://api.jikan.moe/v4/anime?q=','anime','sendMessage','Anime\x20not\x20found\x20or\x20an\x20error\x20occurred.','HANDLER','\x0a\x20\x20\x20\x20\x20\x20\x20\x20**Score:**\x20','genres','2005906pzETAg','18718VvJgJG','3355539pyeINk','14990quMmQD','\x0a\x20\x20\x20\x20\x20\x20','axios','error','join','Image\x20could\x20not\x20be\x20sent.\x20Please\x20try\x20again\x20later.','title','Fetches\x20information\x20about\x20a\x20specified\x20anime\x20title\x20from\x20the\x20Jikan\x20API.\x20Example\x20usage:\x20.anime\x20Naruto','\x0a\x20\x20\x20\x20\x20\x20\x20\x20**Image:**\x20','../config','10JPkAPn','slice','N/A','jpg','3111788KKQfmC','key','3681AMdRUh','Error\x20fetching\x20anime\x20data:','length','4972HpCBJw','Error\x20handling\x20anime\x20command:','duration','conversation','episodes','55848BUVEHe','5140074pFOeUv','53SWmJxy','get','\x0a\x20\x20\x20\x20\x20\x20\x20\x20**Type:**\x20','data','exports','\x0a\x20\x20\x20\x20\x20\x20\x20\x20**Japanese\x20title:**\x20','remoteJid','\x0a\x20\x20\x20\x20\x20\x20\x20\x20**Episodes:**\x20','An\x20error\x20occurred\x20while\x20processing\x20your\x20request.\x20Please\x20try\x20again\x20later.','score','image_url','type','status','images','32XysoSc'];_0x4323=function(){return _0x26de54;};return _0x4323();}const axios=require(_0x1ef5a6(0x11f)),config=require(_0x1ef5a6(0x126));async function getAnimeInfo(_0x1282c9){const _0x58dce8=_0x1ef5a6;try{const _0x3df478=await axios[_0x58dce8(0x105)](_0x58dce8(0x113)+_0x1282c9+'&sfw');return _0x3df478[_0x58dce8(0x107)][_0x58dce8(0x107)][0x0];}catch(_0x4a51){return console['error'](_0x58dce8(0xfb),_0x4a51),null;}}async function handleAnimeCommand(_0x1609c9,_0x371e22){const _0x5db0ca=_0x1ef5a6;try{const _0x2a8664=_0x371e22['message'][_0x5db0ca(0x100)]['split']('\x20');if(_0x2a8664[_0x5db0ca(0xfc)]<0x2){await _0x1609c9[_0x5db0ca(0x115)](_0x371e22[_0x5db0ca(0xf9)][_0x5db0ca(0x10a)],{'text':'Please\x20provide\x20an\x20anime\x20name\x20after\x20the\x20command.\x20Example:\x20.anime\x20Naruto'});return;}const _0xa0fb68=_0x2a8664[_0x5db0ca(0xf5)](0x1)[_0x5db0ca(0x121)]('\x20'),_0x249ef0=await getAnimeInfo(_0xa0fb68);if(_0x249ef0){const _0x2d89ce='\x0a\x20\x20\x20\x20\x20\x20\x20\x20**Title:**\x20'+(_0x249ef0[_0x5db0ca(0x123)]||_0x5db0ca(0xf6))+_0x5db0ca(0x109)+(_0x249ef0['title_japanese']||'N/A')+_0x5db0ca(0x106)+(_0x249ef0[_0x5db0ca(0x10f)]||'N/A')+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20**genre**\x20'+(_0x249ef0[_0x5db0ca(0x119)]||'N/A')+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20**Minutes\x20per\x20episode:**\x20'+(_0x249ef0[_0x5db0ca(0xff)]||_0x5db0ca(0xf6))+_0x5db0ca(0x10b)+(_0x249ef0[_0x5db0ca(0x101)]||_0x5db0ca(0xf6))+_0x5db0ca(0x118)+(_0x249ef0[_0x5db0ca(0x10d)]||'N/A')+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20**Status:**\x20'+(_0x249ef0[_0x5db0ca(0x110)]||_0x5db0ca(0xf6))+'\x0a\x20\x20\x20\x20\x20\x20\x20\x20**Synopsis:**\x20'+(_0x249ef0['synopsis']||_0x5db0ca(0xf6))+_0x5db0ca(0x125)+(_0x249ef0['images']?.[_0x5db0ca(0xf7)]?.[_0x5db0ca(0x10e)]||'No\x20image\x20available')+_0x5db0ca(0x11e);try{await _0x1609c9[_0x5db0ca(0x115)](_0x371e22[_0x5db0ca(0xf9)][_0x5db0ca(0x10a)],{'image':{'url':_0x249ef0[_0x5db0ca(0x111)][_0x5db0ca(0xf7)][_0x5db0ca(0x10e)]},'caption':_0x2d89ce});}catch(_0x33cd58){console[_0x5db0ca(0x120)]('Error\x20sending\x20anime\x20image:',_0x33cd58),await _0x1609c9['sendMessage'](_0x371e22[_0x5db0ca(0xf9)][_0x5db0ca(0x10a)],{'text':_0x5db0ca(0x122)});}}else await _0x1609c9[_0x5db0ca(0x115)](_0x371e22[_0x5db0ca(0xf9)][_0x5db0ca(0x10a)],{'text':_0x5db0ca(0x116)});}catch(_0x3a0579){console[_0x5db0ca(0x120)](_0x5db0ca(0xfe),_0x3a0579),await _0x1609c9[_0x5db0ca(0x115)](_0x371e22[_0x5db0ca(0xf9)][_0x5db0ca(0x10a)],{'text':_0x5db0ca(0x10c)});}}function _0x388c(_0x5187a8,_0x27567e){const _0x432399=_0x4323();return _0x388c=function(_0x388cfd,_0x49278f){_0x388cfd=_0x388cfd-0xf4;let _0x3623b7=_0x432399[_0x388cfd];return _0x3623b7;},_0x388c(_0x5187a8,_0x27567e);}const animeCommand={'fullCommand':config[_0x1ef5a6(0x117)]+_0x1ef5a6(0x114),'name':_0x1ef5a6(0x114),'description':_0x1ef5a6(0x124),'execute':handleAnimeCommand};module[_0x1ef5a6(0x108)]={animeCommand};