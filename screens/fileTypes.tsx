import React from "react";
import {AntDesign, Entypo} from "@expo/vector-icons";

export function typeIcons(ttp, sizeImg = 24, color = "black")
{
    switch(ttp){
        case 'image/jpg' :
            return (
                <Entypo name="image" size={sizeImg} color={color} />
            );
        case 'image/jpeg' :
            return (
                <Entypo name="image" size={sizeImg} color={color} />
            );
        case 'image/png' :
            return (
                <Entypo name="image" size={sizeImg} color={sizeImg} />
            );
        case 'application/pdf' :
            return (
                <AntDesign name="pdffile1" size={sizeImg} color={sizeImg} />
            );
        default :
            return (
                <AntDesign name="save" size={sizeImg} color={sizeImg} />
            );
    }
}

export function fileTypes(ttp)
{
    switch (ttp) {
        case "x3d" :
            return "application/vnd.hzn-3d-crossword";
        case "3gp" :
            return "video/3gpp";
        case "3g2" :
            return "video/3gpp2";
        case "mseq" :
            return "application/vnd.mseq";
        case "pwn" :
            return "application/vnd.3m.post-it-notes";
        case "plb" :
            return "application/vnd.3gpp.pic-bw-large";
        case "psb" :
            return "application/vnd.3gpp.pic-bw-small";
        case "pvb" :
            return "application/vnd.3gpp.pic-bw-var";
        case "tcap" :
            return "application/vnd.3gpp2.tcap";
        case "7z" :
            return "application/x-7z-compressed";
        case "abw" :
            return "application/x-abiword";
        case "ace" :
            return "application/x-ace-compressed";
        case "acc" :
            return "application/vnd.americandynamics.acc";
        case "acu" :
            return "application/vnd.acucobol";
        case "atc" :
            return "application/vnd.acucorp";
        case "adp" :
            return "audio/adpcm";
        case "aab" :
            return "application/x-authorware-bin";
        case "aam" :
            return "application/x-authorware-map";
        case "aas" :
            return "application/x-authorware-seg";
        case "air" :
            return "application/vnd.adobe.air-application-installer-package+zip";
        case "swf" :
            return "application/x-shockwave-flash";
        case "fxp" :
            return "application/vnd.adobe.fxp";
        case "pdf" :
            return "application/pdf";
        case "ppd" :
            return "application/vnd.cups-ppd";
        case "dir" :
            return "application/x-director";
        case "xdp" :
            return "application/vnd.adobe.xdp+xml";
        case "xfdf" :
            return "application/vnd.adobe.xfdf";
        case "aac" :
            return "audio/x-aac";
        case "ahead" :
            return "application/vnd.ahead.space";
        case "azf" :
            return "application/vnd.airzip.filesecure.azf";
        case "azs" :
            return "application/vnd.airzip.filesecure.azs";
        case "azw" :
            return "application/vnd.amazon.ebook";
        case "ami" :
            return "application/vnd.amiga.ami";
        case "N/A" :
            return "application/andrew-inset";
        case "apk" :
            return "application/vnd.android.package-archive";
        case "cii" :
            return "application/vnd.anser-web-certificate-issue-initiation";
        case "fti" :
            return "application/vnd.anser-web-funds-transfer-initiation";
        case "atx" :
            return "application/vnd.antix.game-component";
        case "dmg" :
            return "application/x-apple-diskimage";
        case "mpkg" :
            return "application/vnd.apple.installer+xml";
        case "aw" :
            return "application/applixware";
        case "les" :
            return "application/vnd.hhe.lesson-player";
        case "swi" :
            return "application/vnd.aristanetworks.swi";
        case "s" :
            return "text/x-asm";
        case "atomcat" :
            return "application/atomcat+xml";
        case "atomsvc" :
            return "application/atomsvc+xml";
        case "atom" :
            return "application/atom+xml";
        case "ac" :
            return "application/pkix-attr-cert";
        case "aif" :
            return "audio/x-aiff";
        case "avi" :
            return "video/x-msvideo";
        case "aep" :
            return "application/vnd.audiograph";
        case "dxf" :
            return "image/vnd.dxf";
        case "dwf" :
            return "model/vnd.dwf";
        case "par" :
            return "text/plain-bas";
        case "bcpio" :
            return "application/x-bcpio";
        case "bin" :
            return "application/octet-stream";
        case "bmp" :
            return "image/bmp";
        case "torrent" :
            return "application/x-bittorrent";
        case "cod" :
            return "application/vnd.rim.cod";
        case "mpm" :
            return "application/vnd.blueice.multipass";
        case "bmi" :
            return "application/vnd.bmi";
        case "sh" :
            return "application/x-sh";
        case "btif" :
            return "image/prs.btif";
        case "rep" :
            return "application/vnd.businessobjects";
        case "bz" :
            return "application/x-bzip";
        case "bz2" :
            return "application/x-bzip2";
        case "csh" :
            return "application/x-csh";
        case "c" :
            return "text/x-c";
        case "cdxml" :
            return "application/vnd.chemdraw+xml";
        case "css" :
            return "text/css";
        case "cdx" :
            return "chemical/x-cdx";
        case "cml" :
            return "chemical/x-cml";
        case "csml" :
            return "chemical/x-csml";
        case "cdbcmsg" :
            return "application/vnd.contact.cmsg";
        case "cla" :
            return "application/vnd.claymore";
        case "c4g" :
            return "application/vnd.clonk.c4group";
        case "sub" :
            return "image/vnd.dvb.subtitle";
        case "cdmia" :
            return "application/cdmi-capability";
        case "cdmic" :
            return "application/cdmi-container";
        case "cdmid" :
            return "application/cdmi-domain";
        case "cdmio" :
            return "application/cdmi-object";
        case "cdmiq" :
            return "application/cdmi-queue";
        case "c11amc" :
            return "application/vnd.cluetrust.cartomobile-config";
        case "c11amz" :
            return "application/vnd.cluetrust.cartomobile-config-pkg";
        case "ras" :
            return "image/x-cmu-raster";
        case "dae" :
            return "model/vnd.collada+xml";
        case "csv" :
            return "text/csv";
        case "cpt" :
            return "application/mac-compactpro";
        case "wmlc" :
            return "application/vnd.wap.wmlc";
        case "cgm" :
            return "image/cgm";
        case "ice" :
            return "x-conference/x-cooltalk";
        case "cmx" :
            return "image/x-cmx";
        case "xar" :
            return "application/vnd.xara";
        case "cmc" :
            return "application/vnd.cosmocaller";
        case "cpio" :
            return "application/x-cpio";
        case "clkx" :
            return "application/vnd.crick.clicker";
        case "clkk" :
            return "application/vnd.crick.clicker.keyboard";
        case "clkp" :
            return "application/vnd.crick.clicker.palette";
        case "clkt" :
            return "application/vnd.crick.clicker.template";
        case "clkw" :
            return "application/vnd.crick.clicker.wordbank";
        case "wbs" :
            return "application/vnd.criticaltools.wbs+xml";
        case "cryptonote" :
            return "application/vnd.rig.cryptonote";
        case "cif" :
            return "chemical/x-cif";
        case "cmdf" :
            return "chemical/x-cmdf";
        case "cu" :
            return "application/cu-seeme";
        case "cww" :
            return "application/prs.cww";
        case "curl" :
            return "text/vnd.curl";
        case "dcurl" :
            return "text/vnd.curl.dcurl";
        case "mcurl" :
            return "text/vnd.curl.mcurl";
        case "scurl" :
            return "text/vnd.curl.scurl";
        case "car" :
            return "application/vnd.curl.car";
        case "pcurl" :
            return "application/vnd.curl.pcurl";
        case "cmp" :
            return "application/vnd.yellowriver-custom-menu";
        case "dssc" :
            return "application/dssc+der";
        case "xdssc" :
            return "application/dssc+xml";
        case "deb" :
            return "application/x-debian-package";
        case "uva" :
            return "audio/vnd.dece.audio";
        case "uvi" :
            return "image/vnd.dece.graphic";
        case "uvh" :
            return "video/vnd.dece.hd";
        case "uvm" :
            return "video/vnd.dece.mobile";
        case "uvu" :
            return "video/vnd.uvvu.mp4";
        case "uvp" :
            return "video/vnd.dece.pd";
        case "uvs" :
            return "video/vnd.dece.sd";
        case "uvv" :
            return "video/vnd.dece.video";
        case "dvi" :
            return "application/x-dvi";
        case "seed" :
            return "application/vnd.fdsn.seed";
        case "dtb" :
            return "application/x-dtbook+xml";
        case "res" :
            return "application/x-dtbresource+xml";
        case "ait" :
            return "application/vnd.dvb.ait";
        case "svc" :
            return "application/vnd.dvb.service";
        case "eol" :
            return "audio/vnd.digital-winds";
        case "djvu" :
            return "image/vnd.djvu";
        case "dtd" :
            return "application/xml-dtd";
        case "mlp" :
            return "application/vnd.dolby.mlp";
        case "wad" :
            return "application/x-doom";
        case "dpg" :
            return "application/vnd.dpgraph";
        case "dra" :
            return "audio/vnd.dra";
        case "dfac" :
            return "application/vnd.dreamfactory";
        case "dts" :
            return "audio/vnd.dts";
        case "dtshd" :
            return "audio/vnd.dts.hd";
        case "dwg" :
            return "image/vnd.dwg";
        case "geo" :
            return "application/vnd.dynageo";
        case "es" :
            return "application/ecmascript";
        case "mag" :
            return "application/vnd.ecowin.chart";
        case "mmr" :
            return "image/vnd.fujixerox.edmics-mmr";
        case "rlc" :
            return "image/vnd.fujixerox.edmics-rlc";
        case "exi" :
            return "application/exi";
        case "mgz" :
            return "application/vnd.proteus.magazine";
        case "epub" :
            return "application/epub+zip";
        case "eml" :
            return "message/rfc822";
        case "nml" :
            return "application/vnd.enliven";
        case "xpr" :
            return "application/vnd.is-xpr";
        case "xif" :
            return "image/vnd.xiff";
        case "xfdl" :
            return "application/vnd.xfdl";
        case "emma" :
            return "application/emma+xml";
        case "ez2" :
            return "application/vnd.ezpix-album";
        case "ez3" :
            return "application/vnd.ezpix-package";
        case "fst" :
            return "image/vnd.fst";
        case "fvt" :
            return "video/vnd.fvt";
        case "fbs" :
            return "image/vnd.fastbidsheet";
        case "fe_launch" :
            return "application/vnd.denovo.fcselayout-link";
        case "f4v" :
            return "video/x-f4v";
        case "flv" :
            return "video/x-flv";
        case "fpx" :
            return "image/vnd.fpx";
        case "npx" :
            return "image/vnd.net-fpx";
        case "flx" :
            return "text/vnd.fmi.flexstor";
        case "fli" :
            return "video/x-fli";
        case "ftc" :
            return "application/vnd.fluxtime.clip";
        case "fdf" :
            return "application/vnd.fdf";
        case "f" :
            return "text/x-fortran";
        case "mif" :
            return "application/vnd.mif";
        case "fm" :
            return "application/vnd.framemaker";
        case "fh" :
            return "image/x-freehand";
        case "fsc" :
            return "application/vnd.fsc.weblaunch";
        case "fnc" :
            return "application/vnd.frogans.fnc";
        case "ltf" :
            return "application/vnd.frogans.ltf";
        case "ddd" :
            return "application/vnd.fujixerox.ddd";
        case "xdw" :
            return "application/vnd.fujixerox.docuworks";
        case "xbd" :
            return "application/vnd.fujixerox.docuworks.binder";
        case "oas" :
            return "application/vnd.fujitsu.oasys";
        case "oa2" :
            return "application/vnd.fujitsu.oasys2";
        case "oa3" :
            return "application/vnd.fujitsu.oasys3";
        case "fg5" :
            return "application/vnd.fujitsu.oasysgp";
        case "bh2" :
            return "application/vnd.fujitsu.oasysprs";
        case "spl" :
            return "application/x-futuresplash";
        case "fzs" :
            return "application/vnd.fuzzysheet";
        case "g3" :
            return "image/g3fax";
        case "gmx" :
            return "application/vnd.gmx";
        case "gtw" :
            return "model/vnd.gtw";
        case "txd" :
            return "application/vnd.genomatix.tuxedo";
        case "ggb" :
            return "application/vnd.geogebra.file";
        case "ggt" :
            return "application/vnd.geogebra.tool";
        case "gdl" :
            return "model/vnd.gdl";
        case "gex" :
            return "application/vnd.geometry-explorer";
        case "gxt" :
            return "application/vnd.geonext";
        case "g2w" :
            return "application/vnd.geoplan";
        case "g3w" :
            return "application/vnd.geospace";
        case "gsf" :
            return "application/x-font-ghostscript";
        case "bdf" :
            return "application/x-font-bdf";
        case "gtar" :
            return "application/x-gtar";
        case "texinfo" :
            return "application/x-texinfo";
        case "gnumeric" :
            return "application/x-gnumeric";
        case "kml" :
            return "application/vnd.google-earth.kml+xml";
        case "kmz" :
            return "application/vnd.google-earth.kmz";
        case "gpx" :
            return "application/gpx+xml";
        case "gqf" :
            return "application/vnd.grafeq";
        case "gif" :
            return "image/gif";
        case "gv" :
            return "text/vnd.graphviz";
        case "gac" :
            return "application/vnd.groove-account";
        case "ghf" :
            return "application/vnd.groove-help";
        case "gim" :
            return "application/vnd.groove-identity-message";
        case "grv" :
            return "application/vnd.groove-injector";
        case "gtm" :
            return "application/vnd.groove-tool-message";
        case "tpl" :
            return "application/vnd.groove-tool-template";
        case "vcg" :
            return "application/vnd.groove-vcard";
        case "h261" :
            return "video/h261";
        case "h263" :
            return "video/h263";
        case "h264" :
            return "video/h264";
        case "hpid" :
            return "application/vnd.hp-hpid";
        case "hps" :
            return "application/vnd.hp-hps";
        case "hdf" :
            return "application/x-hdf";
        case "rip" :
            return "audio/vnd.rip";
        case "hbci" :
            return "application/vnd.hbci";
        case "jlt" :
            return "application/vnd.hp-jlyt";
        case "pcl" :
            return "application/vnd.hp-pcl";
        case "hpgl" :
            return "application/vnd.hp-hpgl";
        case "hvs" :
            return "application/vnd.yamaha.hv-script";
        case "hvd" :
            return "application/vnd.yamaha.hv-dic";
        case "hvp" :
            return "application/vnd.yamaha.hv-voice";
        case "sfd-hdstx" :
            return "application/vnd.hydrostatix.sof-data";
        case "stk" :
            return "application/hyperstudio";
        case "hal" :
            return "application/vnd.hal+xml";
        case "html" :
            return "text/html";
        case "irm" :
            return "application/vnd.ibm.rights-management";
        case "sc" :
            return "application/vnd.ibm.secure-container";
        case "ics" :
            return "text/calendar";
        case "icc" :
            return "application/vnd.iccprofile";
        case "ico" :
            return "image/x-icon";
        case "igl" :
            return "application/vnd.igloader";
        case "ief" :
            return "image/ief";
        case "ivp" :
            return "application/vnd.immervision-ivp";
        case "ivu" :
            return "application/vnd.immervision-ivu";
        case "rif" :
            return "application/reginfo+xml";
        case "3dml" :
            return "text/vnd.in3d.3dml";
        case "spot" :
            return "text/vnd.in3d.spot";
        case "igs" :
            return "model/iges";
        case "i2g" :
            return "application/vnd.intergeo";
        case "cdy" :
            return "application/vnd.cinderella";
        case "xpw" :
            return "application/vnd.intercon.formnet";
        case "fcs" :
            return "application/vnd.isac.fcs";
        case "ipfix" :
            return "application/ipfix";
        case "cer" :
            return "application/pkix-cert";
        case "pki" :
            return "application/pkixcmp";
        case "crl" :
            return "application/pkix-crl";
        case "pkipath" :
            return "application/pkix-pkipath";
        case "igm" :
            return "application/vnd.insors.igm";
        case "rcprofile" :
            return "application/vnd.ipunplugged.rcprofile";
        case "irp" :
            return "application/vnd.irepository.package+xml";
        case "jad" :
            return "text/vnd.sun.j2me.app-descriptor";
        case "jar" :
            return "application/java-archive";
        case "class" :
            return "application/java-vm";
        case "jnlp" :
            return "application/x-java-jnlp-file";
        case "ser" :
            return "application/java-serialized-object";
        case "java" :
            return "text/x-java-source,java";
        case "js" :
            return "application/javascript";
        case "json" :
            return "application/json";
        case "joda" :
            return "application/vnd.joost.joda-archive";
        case "jpm" :
            return "video/jpm";
        case "jpg" :
            return "image/jpeg";
        case "jpeg" :
            return "image/jpeg";
        case "pjpeg" :
            return "image/pjpeg";
        case "jpgv" :
            return "video/jpeg";
        case "ktz" :
            return "application/vnd.kahootz";
        case "mmd" :
            return "application/vnd.chipnuts.karaoke-mmd";
        case "karbon" :
            return "application/vnd.kde.karbon";
        case "chrt" :
            return "application/vnd.kde.kchart";
        case "kfo" :
            return "application/vnd.kde.kformula";
        case "flw" :
            return "application/vnd.kde.kivio";
        case "kon" :
            return "application/vnd.kde.kontour";
        case "kpr" :
            return "application/vnd.kde.kpresenter";
        case "ksp" :
            return "application/vnd.kde.kspread";
        case "kwd" :
            return "application/vnd.kde.kword";
        case "htke" :
            return "application/vnd.kenameaapp";
        case "kia" :
            return "application/vnd.kidspiration";
        case "kne" :
            return "application/vnd.kinar";
        case "sse" :
            return "application/vnd.kodak-descriptor";
        case "lasxml" :
            return "application/vnd.las.las+xml";
        case "latex" :
            return "application/x-latex";
        case "lbd" :
            return "application/vnd.llamagraphics.life-balance.desktop";
        case "lbe" :
            return "application/vnd.llamagraphics.life-balance.exchange+xml";
        case "jam" :
            return "application/vnd.jam";
        case "123" :
            return "application/vnd.lotus-1-2-3";
        case "apr" :
            return "application/vnd.lotus-approach";
        case "pre" :
            return "application/vnd.lotus-freelance";
        case "nsf" :
            return "application/vnd.lotus-notes";
        case "org" :
            return "application/vnd.lotus-organizer";
        case "scm" :
            return "application/vnd.lotus-screencam";
        case "lwp" :
            return "application/vnd.lotus-wordpro";
        case "lvp" :
            return "audio/vnd.lucent.voice";
        case "m3u" :
            return "audio/x-mpegurl";
        case "m4v" :
            return "video/x-m4v";
        case "hqx" :
            return "application/mac-binhex40";
        case "portpkg" :
            return "application/vnd.macports.portpkg";
        case "mgp" :
            return "application/vnd.osgeo.mapguide.package";
        case "mrc" :
            return "application/marc";
        case "mrcx" :
            return "application/marcxml+xml";
        case "mxf" :
            return "application/mxf";
        case "nbp" :
            return "application/vnd.wolfram.player";
        case "ma" :
            return "application/mathematica";
        case "mathml" :
            return "application/mathml+xml";
        case "mbox" :
            return "application/mbox";
        case "mc1" :
            return "application/vnd.medcalcdata";
        case "mscml" :
            return "application/mediaservercontrol+xml";
        case "cdkey" :
            return "application/vnd.mediastation.cdkey";
        case "mwf" :
            return "application/vnd.mfer";
        case "mfm" :
            return "application/vnd.mfmp";
        case "msh" :
            return "model/mesh";
        case "mads" :
            return "application/mads+xml";
        case "mets" :
            return "application/mets+xml";
        case "mods" :
            return "application/mods+xml";
        case "meta4" :
            return "application/metalink4+xml";
        case "mcd" :
            return "application/vnd.mcd";
        case "flo" :
            return "application/vnd.micrografx.flo";
        case "igx" :
            return "application/vnd.micrografx.igx";
        case "es3" :
            return "application/vnd.eszigno3+xml";
        case "mdb" :
            return "application/x-msaccess";
        case "asf" :
            return "video/x-ms-asf";
        case "exe" :
            return "application/x-msdownload";
        case "cil" :
            return "application/vnd.ms-artgalry";
        case "cab" :
            return "application/vnd.ms-cab-compressed";
        case "ims" :
            return "application/vnd.ms-ims";
        case "application" :
            return "application/x-ms-application";
        case "clp" :
            return "application/x-msclip";
        case "mdi" :
            return "image/vnd.ms-modi";
        case "eot" :
            return "application/vnd.ms-fontobject";
        case "xls" :
            return "application/vnd.ms-excel";
        case "xlam" :
            return "application/vnd.ms-excel.addin.macroenabled.12";
        case "xlsb" :
            return "application/vnd.ms-excel.sheet.binary.macroenabled.12";
        case "xltm" :
            return "application/vnd.ms-excel.template.macroenabled.12";
        case "xlsm" :
            return "application/vnd.ms-excel.sheet.macroenabled.12";
        case "chm" :
            return "application/vnd.ms-htmlhelp";
        case "crd" :
            return "application/x-mscardfile";
        case "lrm" :
            return "application/vnd.ms-lrm";
        case "mvb" :
            return "application/x-msmediaview";
        case "mny" :
            return "application/x-msmoney";
        case "pptx" :
            return "application/vnd.openxmlformats-officedocument.presentationml.presentation";
        case "sldx" :
            return "application/vnd.openxmlformats-officedocument.presentationml.slide";
        case "ppsx" :
            return "application/vnd.openxmlformats-officedocument.presentationml.slideshow";
        case "potx" :
            return "application/vnd.openxmlformats-officedocument.presentationml.template";
        case "xlsx" :
            return "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
        case "xltx" :
            return "application/vnd.openxmlformats-officedocument.spreadsheetml.template";
        case "docx" :
            return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
        case "dotx" :
            return "application/vnd.openxmlformats-officedocument.wordprocessingml.template";
        case "obd" :
            return "application/x-msbinder";
        case "thmx" :
            return "application/vnd.ms-officetheme";
        case "onetoc" :
            return "application/onenote";
        case "pya" :
            return "audio/vnd.ms-playready.media.pya";
        case "pyv" :
            return "video/vnd.ms-playready.media.pyv";
        case "ppt" :
            return "application/vnd.ms-powerpoint";
        case "ppam" :
            return "application/vnd.ms-powerpoint.addin.macroenabled.12";
        case "sldm" :
            return "application/vnd.ms-powerpoint.slide.macroenabled.12";
        case "pptm" :
            return "application/vnd.ms-powerpoint.presentation.macroenabled.12";
        case "ppsm" :
            return "application/vnd.ms-powerpoint.slideshow.macroenabled.12";
        case "potm" :
            return "application/vnd.ms-powerpoint.template.macroenabled.12";
        case "mpp" :
            return "application/vnd.ms-project";
        case "pub" :
            return "application/x-mspublisher";
        case "scd" :
            return "application/x-msschedule";
        case "xap" :
            return "application/x-silverlight-app";
        case "stl" :
            return "application/vnd.ms-pki.stl";
        case "cat" :
            return "application/vnd.ms-pki.seccat";
        case "vsd" :
            return "application/vnd.visio";
        case "vsdx" :
            return "application/vnd.visio2013";
        case "wm" :
            return "video/x-ms-wm";
        case "wma" :
            return "audio/x-ms-wma";
        case "wax" :
            return "audio/x-ms-wax";
        case "wmx" :
            return "video/x-ms-wmx";
        case "wmd" :
            return "application/x-ms-wmd";
        case "wpl" :
            return "application/vnd.ms-wpl";
        case "wmz" :
            return "application/x-ms-wmz";
        case "wmv" :
            return "video/x-ms-wmv";
        case "wvx" :
            return "video/x-ms-wvx";
        case "wmf" :
            return "application/x-msmetafile";
        case "trm" :
            return "application/x-msterminal";
        case "doc" :
            return "application/msword";
        case "docm" :
            return "application/vnd.ms-word.document.macroenabled.12";
        case "dotm" :
            return "application/vnd.ms-word.template.macroenabled.12";
        case "wri" :
            return "application/x-mswrite";
        case "wps" :
            return "application/vnd.ms-works";
        case "xbap" :
            return "application/x-ms-xbap";
        case "xps" :
            return "application/vnd.ms-xpsdocument";
        case "mid" :
            return "audio/midi";
        case "mpy" :
            return "application/vnd.ibm.minipay";
        case "afp" :
            return "application/vnd.ibm.modcap";
        case "rms" :
            return "application/vnd.jcp.javame.midlet-rms";
        case "tmo" :
            return "application/vnd.tmobile-livetv";
        case "prc" :
            return "application/x-mobipocket-ebook";
        case "mbk" :
            return "application/vnd.mobius.mbk";
        case "dis" :
            return "application/vnd.mobius.dis";
        case "plc" :
            return "application/vnd.mobius.plc";
        case "mqy" :
            return "application/vnd.mobius.mqy";
        case "msl" :
            return "application/vnd.mobius.msl";
        case "txf" :
            return "application/vnd.mobius.txf";
        case "daf" :
            return "application/vnd.mobius.daf";
        case "fly" :
            return "text/vnd.fly";
        case "mpc" :
            return "application/vnd.mophun.certificate";
        case "mpn" :
            return "application/vnd.mophun.application";
        case "mj2" :
            return "video/mj2";
        case "mpga" :
            return "audio/mpeg";
        case "mxu" :
            return "video/vnd.mpegurl";
        case "mpeg" :
            return "video/mpeg";
        case "m21" :
            return "application/mp21";
        case "mp4a" :
            return "audio/mp4";
        case "mp4" :
            return "video/mp4";
        case "mp4" :
            return "application/mp4";
        case "m3u8" :
            return "application/vnd.apple.mpegurl";
        case "mus" :
            return "application/vnd.musician";
        case "msty" :
            return "application/vnd.muvee.style";
        case "mxml" :
            return "application/xv+xml";
        case "ngdat" :
            return "application/vnd.nokia.n-gage.data";
        case "n-gage" :
            return "application/vnd.nokia.n-gage.symbian.install";
        case "ncx" :
            return "application/x-dtbncx+xml";
        case "nc" :
            return "application/x-netcdf";
        case "nlu" :
            return "application/vnd.neurolanguage.nlu";
        case "dna" :
            return "application/vnd.dna";
        case "nnd" :
            return "application/vnd.noblenet-directory";
        case "nns" :
            return "application/vnd.noblenet-sealer";
        case "nnw" :
            return "application/vnd.noblenet-web";
        case "rpst" :
            return "application/vnd.nokia.radio-preset";
        case "rpss" :
            return "application/vnd.nokia.radio-presets";
        case "n3" :
            return "text/n3";
        case "edm" :
            return "application/vnd.novadigm.edm";
        case "edx" :
            return "application/vnd.novadigm.edx";
        case "ext" :
            return "application/vnd.novadigm.ext";
        case "gph" :
            return "application/vnd.flographit";
        case "ecelp4800" :
            return "audio/vnd.nuera.ecelp4800";
        case "ecelp7470" :
            return "audio/vnd.nuera.ecelp7470";
        case "ecelp9600" :
            return "audio/vnd.nuera.ecelp9600";
        case "oda" :
            return "application/oda";
        case "ogx" :
            return "application/ogg";
        case "oga" :
            return "audio/ogg";
        case "ogv" :
            return "video/ogg";
        case "dd2" :
            return "application/vnd.oma.dd2+xml";
        case "oth" :
            return "application/vnd.oasis.opendocument.text-web";
        case "opf" :
            return "application/oebps-package+xml";
        case "qbo" :
            return "application/vnd.intu.qbo";
        case "oxt" :
            return "application/vnd.openofficeorg.extension";
        case "osf" :
            return "application/vnd.yamaha.openscoreformat";
        case "weba" :
            return "audio/webm";
        case "webm" :
            return "video/webm";
        case "odc" :
            return "application/vnd.oasis.opendocument.chart";
        case "otc" :
            return "application/vnd.oasis.opendocument.chart-template";
        case "odb" :
            return "application/vnd.oasis.opendocument.database";
        case "odf" :
            return "application/vnd.oasis.opendocument.formula";
        case "odft" :
            return "application/vnd.oasis.opendocument.formula-template";
        case "odg" :
            return "application/vnd.oasis.opendocument.graphics";
        case "otg" :
            return "application/vnd.oasis.opendocument.graphics-template";
        case "odi" :
            return "application/vnd.oasis.opendocument.image";
        case "oti" :
            return "application/vnd.oasis.opendocument.image-template";
        case "odp" :
            return "application/vnd.oasis.opendocument.presentation";
        case "otp" :
            return "application/vnd.oasis.opendocument.presentation-template";
        case "ods" :
            return "application/vnd.oasis.opendocument.spreadsheet";
        case "ots" :
            return "application/vnd.oasis.opendocument.spreadsheet-template";
        case "odt" :
            return "application/vnd.oasis.opendocument.text";
        case "odm" :
            return "application/vnd.oasis.opendocument.text-master";
        case "ott" :
            return "application/vnd.oasis.opendocument.text-template";
        case "ktx" :
            return "image/ktx";
        case "sxc" :
            return "application/vnd.sun.xml.calc";
        case "stc" :
            return "application/vnd.sun.xml.calc.template";
        case "sxd" :
            return "application/vnd.sun.xml.draw";
        case "std" :
            return "application/vnd.sun.xml.draw.template";
        case "sxi" :
            return "application/vnd.sun.xml.impress";
        case "sti" :
            return "application/vnd.sun.xml.impress.template";
        case "sxm" :
            return "application/vnd.sun.xml.math";
        case "sxw" :
            return "application/vnd.sun.xml.writer";
        case "sxg" :
            return "application/vnd.sun.xml.writer.global";
        case "stw" :
            return "application/vnd.sun.xml.writer.template";
        case "otf" :
            return "application/x-font-otf";
        case "osfpvg" :
            return "application/vnd.yamaha.openscoreformat.osfpvg+xml";
        case "dp" :
            return "application/vnd.osgi.dp";
        case "pdb" :
            return "application/vnd.palm";
        case "p" :
            return "text/x-pascal";
        case "paw" :
            return "application/vnd.pawaafile";
        case "pclxl" :
            return "application/vnd.hp-pclxl";
        case "efif" :
            return "application/vnd.picsel";
        case "pcx" :
            return "image/x-pcx";
        case "psd" :
            return "image/vnd.adobe.photoshop";
        case "prf" :
            return "application/pics-rules";
        case "pic" :
            return "image/x-pict";
        case "chat" :
            return "application/x-chat";
        case "p10" :
            return "application/pkcs10";
        case "p12" :
            return "application/x-pkcs12";
        case "p7m" :
            return "application/pkcs7-mime";
        case "p7s" :
            return "application/pkcs7-signature";
        case "p7r" :
            return "application/x-pkcs7-certreqresp";
        case "p7b" :
            return "application/x-pkcs7-certificates";
        case "p8" :
            return "application/pkcs8";
        case "plf" :
            return "application/vnd.pocketlearn";
        case "pnm" :
            return "image/x-portable-anymap";
        case "pbm" :
            return "image/x-portable-bitmap";
        case "pcf" :
            return "application/x-font-pcf";
        case "pfr" :
            return "application/font-tdpfr";
        case "pgn" :
            return "application/x-chess-pgn";
        case "pgm" :
            return "image/x-portable-graymap";
        case "png" :
            return "image/png";
        case "png" :
            return "image/x-citrix-png";
        case "png" :
            return "image/x-png";
        case "ppm" :
            return "image/x-portable-pixmap";
        case "pskcxml" :
            return "application/pskc+xml";
        case "pml" :
            return "application/vnd.ctc-posml";
        case "ai" :
            return "application/postscript";
        case "pfa" :
            return "application/x-font-type1";
        case "pbd" :
            return "application/vnd.powerbuilder6";
        case "pgp" :
            return "application/pgp-encrypted";
        case "pgp" :
            return "application/pgp-signature";
        case "box" :
            return "application/vnd.previewsystems.box";
        case "ptid" :
            return "application/vnd.pvi.ptid1";
        case "pls" :
            return "application/pls+xml";
        case "str" :
            return "application/vnd.pg.format";
        case "ei6" :
            return "application/vnd.pg.osasli";
        case "dsc" :
            return "text/prs.lines.tag";
        case "psf" :
            return "application/x-font-linux-psf";
        case "qps" :
            return "application/vnd.publishare-delta-tree";
        case "wg" :
            return "application/vnd.pmi.widget";
        case "qxd" :
            return "application/vnd.quark.quarkxpress";
        case "esf" :
            return "application/vnd.epson.esf";
        case "msf" :
            return "application/vnd.epson.msf";
        case "ssf" :
            return "application/vnd.epson.ssf";
        case "qam" :
            return "application/vnd.epson.quickanime";
        case "qfx" :
            return "application/vnd.intu.qfx";
        case "qt" :
            return "video/quicktime";
        case "rar" :
            return "application/x-rar-compressed";
        case "ram" :
            return "audio/x-pn-realaudio";
        case "rmp" :
            return "audio/x-pn-realaudio-plugin";
        case "rsd" :
            return "application/rsd+xml";
        case "rm" :
            return "application/vnd.rn-realmedia";
        case "bed" :
            return "application/vnd.realvnc.bed";
        case "mxl" :
            return "application/vnd.recordare.musicxml";
        case "musicxml" :
            return "application/vnd.recordare.musicxml+xml";
        case "rnc" :
            return "application/relax-ng-compact-syntax";
        case "rdz" :
            return "application/vnd.data-vision.rdz";
        case "rdf" :
            return "application/rdf+xml";
        case "rp9" :
            return "application/vnd.cloanto.rp9";
        case "jisp" :
            return "application/vnd.jisp";
        case "rtf" :
            return "application/rtf";
        case "rtx" :
            return "text/richtext";
        case "link66" :
            return "application/vnd.route66.link66+xml";
        case "rss" :
            return "application/rss+xml";
        case "shf" :
            return "application/shf+xml";
        case "st" :
            return "application/vnd.sailingtracker.track";
        case "svg" :
            return "image/svg+xml";
        case "sus" :
            return "application/vnd.sus-calendar";
        case "sru" :
            return "application/sru+xml";
        case "setpay" :
            return "application/set-payment-initiation";
        case "setreg" :
            return "application/set-registration-initiation";
        case "sema" :
            return "application/vnd.sema";
        case "semd" :
            return "application/vnd.semd";
        case "semf" :
            return "application/vnd.semf";
        case "see" :
            return "application/vnd.seemail";
        case "snf" :
            return "application/x-font-snf";
        case "spq" :
            return "application/scvp-vp-request";
        case "spp" :
            return "application/scvp-vp-response";
        case "scq" :
            return "application/scvp-cv-request";
        case "scs" :
            return "application/scvp-cv-response";
        case "sdp" :
            return "application/sdp";
        case "etx" :
            return "text/x-setext";
        case "movie" :
            return "video/x-sgi-movie";
        case "ifm" :
            return "application/vnd.shana.informed.formdata";
        case "itp" :
            return "application/vnd.shana.informed.formtemplate";
        case "iif" :
            return "application/vnd.shana.informed.interchange";
        case "ipk" :
            return "application/vnd.shana.informed.package";
        case "tfi" :
            return "application/thraud+xml";
        case "shar" :
            return "application/x-shar";
        case "rgb" :
            return "image/x-rgb";
        case "slt" :
            return "application/vnd.epson.salt";
        case "aso" :
            return "application/vnd.accpac.simply.aso";
        case "imp" :
            return "application/vnd.accpac.simply.imp";
        case "twd" :
            return "application/vnd.simtech-mindmapper";
        case "csp" :
            return "application/vnd.commonspace";
        case "saf" :
            return "application/vnd.yamaha.smaf-audio";
        case "mmf" :
            return "application/vnd.smaf";
        case "spf" :
            return "application/vnd.yamaha.smaf-phrase";
        case "teacher" :
            return "application/vnd.smart.teacher";
        case "svd" :
            return "application/vnd.svd";
        case "rq" :
            return "application/sparql-query";
        case "srx" :
            return "application/sparql-results+xml";
        case "gram" :
            return "application/srgs";
        case "grxml" :
            return "application/srgs+xml";
        case "ssml" :
            return "application/ssml+xml";
        case "skp" :
            return "application/vnd.koan";
        case "sgml" :
            return "text/sgml";
        case "sdc" :
            return "application/vnd.stardivision.calc";
        case "sda" :
            return "application/vnd.stardivision.draw";
        case "sdd" :
            return "application/vnd.stardivision.impress";
        case "smf" :
            return "application/vnd.stardivision.math";
        case "sdw" :
            return "application/vnd.stardivision.writer";
        case "sgl" :
            return "application/vnd.stardivision.writer-global";
        case "sm" :
            return "application/vnd.stepmania.stepchart";
        case "sit" :
            return "application/x-stuffit";
        case "sitx" :
            return "application/x-stuffitx";
        case "sdkm" :
            return "application/vnd.solent.sdkm+xml";
        case "xo" :
            return "application/vnd.olpc-sugar";
        case "au" :
            return "audio/basic";
        case "wqd" :
            return "application/vnd.wqd";
        case "sis" :
            return "application/vnd.symbian.install";
        case "smi" :
            return "application/smil+xml";
        case "xsm" :
            return "application/vnd.syncml+xml";
        case "bdm" :
            return "application/vnd.syncml.dm+wbxml";
        case "xdm" :
            return "application/vnd.syncml.dm+xml";
        case "sv4cpio" :
            return "application/x-sv4cpio";
        case "sv4crc" :
            return "application/x-sv4crc";
        case "sbml" :
            return "application/sbml+xml";
        case "tsv" :
            return "text/tab-separated-values";
        case "tiff" :
            return "image/tiff";
        case "tao" :
            return "application/vnd.tao.intent-module-archive";
        case "tar" :
            return "application/x-tar";
        case "tcl" :
            return "application/x-tcl";
        case "tex" :
            return "application/x-tex";
        case "tfm" :
            return "application/x-tex-tfm";
        case "tei" :
            return "application/tei+xml";
        case "txt" :
            return "text/plain";
        case "dxp" :
            return "application/vnd.spotfire.dxp";
        case "sfs" :
            return "application/vnd.spotfire.sfs";
        case "tsd" :
            return "application/timestamped-data";
        case "tpt" :
            return "application/vnd.trid.tpt";
        case "mxs" :
            return "application/vnd.triscape.mxs";
        case "t" :
            return "text/troff";
        case "tra" :
            return "application/vnd.trueapp";
        case "ttf" :
            return "application/x-font-ttf";
        case "ttl" :
            return "text/turtle";
        case "umj" :
            return "application/vnd.umajin";
        case "uoml" :
            return "application/vnd.uoml+xml";
        case "unityweb" :
            return "application/vnd.unity";
        case "ufd" :
            return "application/vnd.ufdl";
        case "uri" :
            return "text/uri-list";
        case "utz" :
            return "application/vnd.uiq.theme";
        case "ustar" :
            return "application/x-ustar";
        case "uu" :
            return "text/x-uuencode";
        case "vcs" :
            return "text/x-vcalendar";
        case "vcf" :
            return "text/x-vcard";
        case "vcd" :
            return "application/x-cdlink";
        case "vsf" :
            return "application/vnd.vsf";
        case "wrl" :
            return "model/vrml";
        case "vcx" :
            return "application/vnd.vcx";
        case "mts" :
            return "model/vnd.mts";
        case "vtu" :
            return "model/vnd.vtu";
        case "vis" :
            return "application/vnd.visionary";
        case "viv" :
            return "video/vnd.vivo";
        case "ccxml" :
            return "application/ccxml+xml,";
        case "vxml" :
            return "application/voicexml+xml";
        case "src" :
            return "application/x-wais-source";
        case "wbxml" :
            return "application/vnd.wap.wbxml";
        case "wbmp" :
            return "image/vnd.wap.wbmp";
        case "wav" :
            return "audio/x-wav";
        case "davmount" :
            return "application/davmount+xml";
        case "woff" :
            return "application/x-font-woff";
        case "wspolicy" :
            return "application/wspolicy+xml";
        case "webp" :
            return "image/webp";
        case "wtb" :
            return "application/vnd.webturbo";
        case "wgt" :
            return "application/widget";
        case "hlp" :
            return "application/winhlp";
        case "wml" :
            return "text/vnd.wap.wml";
        case "wmls" :
            return "text/vnd.wap.wmlscript";
        case "wmlsc" :
            return "application/vnd.wap.wmlscriptc";
        case "wpd" :
            return "application/vnd.wordperfect";
        case "stf" :
            return "application/vnd.wt.stf";
        case "wsdl" :
            return "application/wsdl+xml";
        case "xbm" :
            return "image/x-xbitmap";
        case "xpm" :
            return "image/x-xpixmap";
        case "xwd" :
            return "image/x-xwindowdump";
        case "der" :
            return "application/x-x509-ca-cert";
        case "fig" :
            return "application/x-xfig";
        case "xhtml" :
            return "application/xhtml+xml";
        case "xml" :
            return "application/xml";
        case "xdf" :
            return "application/xcap-diff+xml";
        case "xenc" :
            return "application/xenc+xml";
        case "xer" :
            return "application/patch-ops-error+xml";
        case "rl" :
            return "application/resource-lists+xml";
        case "rs" :
            return "application/rls-services+xml";
        case "rld" :
            return "application/resource-lists-diff+xml";
        case "xslt" :
            return "application/xslt+xml";
        case "xop" :
            return "application/xop+xml";
        case "xpi" :
            return "application/x-xpinstall";
        case "xspf" :
            return "application/xspf+xml";
        case "xul" :
            return "application/vnd.mozilla.xul+xml";
        case "xyz" :
            return "chemical/x-xyz";
        case "yaml" :
            return "text/yaml";
        case "yang" :
            return "application/yang";
        case "yin" :
            return "application/yin+xml";
        case "zir" :
            return "application/vnd.zul";
        case "zip" :
            return "application/zip";
        case "zmm" :
            return "application/vnd.handheld-entertainment+xml";
        case "zaz" :
            return "application/vnd.zzazz.deck+xml";
        default    :
            return 'application/'+ttp;
    }
}