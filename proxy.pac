//
// proxy.pac configration
//  2015/3/2 Kunihiro FUJII
//  2015/6/10 v1.0 by Workplace; deploy to ATSD
//  2015/6/20 v1.1 by Workplace; reduce the number of DNS lookups
//  2015/7/3 v1.2 by Workplace; modify o365 services
//  2015/8/5 v1.3 by IWS; add -dev.intraxa
//  2015/8/17 v1.4 by IWS; add global intranet, domainlevel check function
//  2015/9/18 v1.5 by IWS; add axatech2020strategy.axa.intraxa
//  2015/9/30
//  2015/10/7 v1.6 by IWS; reduce the hostmatch for ads-jp.intraxa
//  2016/1/20 v1.7 by IWS; modify O365 Exchnage-online service from proxy exception
//  2016/2/8 v1.8 by IWS; Delete psoft-jp.corp.intraxa from proxy exception
//  2016/2/12 v1.9 by IWS; modify O365 service
//  2016/5/10 v2.0 by IWS; C00381145, C00381145
//  2016/5/25 v2.1 by IWS; C00386820
//  2016/7/6 v2.2 by IWS; C00400190, C00400195
//  2016/10/12 v2.3 by IWS; C00429171, C00429172
//  2017/01/17 v2.4 by IS; CHG0039125
//  2017/04/07 CHG0051139
//  2017/06/05 CHG0057416
//  2017/08/28 CHG0076000
//  2017/11/08 CHG0100786
//  2017/11/22 CHG0110977
//  2017/12/15 CHG0121979
//  2018/01/12 CHG0127474
//  2018/02/22 CHG0153578
//  2018/05/22 CHG0210129
//  2018/06/26 CHG0227664
//  2018/09/10 CHG0259147
//  2019/02/20 CHG0353181

function FindProxyForURL(url, host) { 

var hostip = dnsResolve(host);
// Define proxy server
var proxyserver = "PROXY proxy.ads-jp.intraxa:8080";
var proxyserver2 = "PROXY proxy.axa-nichidan.co.jp:8080";
// Make host lowercase
var lhost = host.toLowerCase();
host = lhost;
return "DIRECT"
//Catch explicit FQDNs which need the proxy but are covered under wildcarded FQDNs which have IPs. This has to be done first before the wildcard is hit

	if (shExpMatch(host, "quicktips.skypeforbusiness.com")||   
     	 shExpMatch(host, "*um.outlook.com")||
      	 shExpMatch(host, "r3.res.office365.com")||
     	 shExpMatch(host, "r3.res.outlook.com")||
     	 shExpMatch(host, "r4.res.office365.com")||
     	 shExpMatch(host, "xsi.outlook.com")||
     	 shExpMatch(host, "r1.res.office365.com")||
	 shExpMatch(host, "api.axa-cloud.com")||
	 shExpMatch(host, "apsmlogon.ext-dev.intraxa")||
	 shExpMatch(host, "apsmlogon.ads-jp.intraxa")||
	 shExpMatch(host, "mdmuip.applications.services.axa-tech.intraxa")||
 	 shExpMatch(host, "smauth.applications.services.axa-tech.intraxa")||
	 shExpMatch(host, "oslogs.pink.ap-southeast-1.aws.openpaas.axa-cloud.com")||
	 shExpMatch(host, "osmetrics.pink.ap-southeast-1.aws.openpaas.axa-cloud.com")||
	 shExpMatch(host, "mellon.pink.ap-southeast-1.aws.openpaas.axa-cloud.com")||
	 shExpMatch(host, "osconsole.pink.ap-southeast-1.aws.openpaas.axa-cloud.com"))

        {
        return proxyserver
        }

// If the requested website is hosted within the internal network, send direct. !NO CHANGE!
	if (isPlainHostName(host)||
	 shExpMatch(host, "*.local")||
	 isInNet(hostip, "10.0.64.0","255.255.255.0")||
	 isInNet(hostip, "10.1.0.0","255.255.0.0")||
	 isInNet(hostip, "10.2.0.0","255.255.0.0")||
	 isInNet(hostip, "10.3.0.0","255.255.0.0")||
	 isInNet(hostip, "10.15.0.0","255.255.0.0")||
	 isInNet(hostip, "127.0.0.0", "255.0.0.0"))
	{
	return "DIRECT";
	}
  
// If the IP matches, send direct.
	if (isInNet(hostip, "10.77.150.22","255.255.255.255")||
	 isInNet(hostip, "10.235.14.138","255.255.255.255")||
	 isInNet(hostip, "10.144.7.3","255.255.255.255")||
         isInNet(hostip, "10.144.76.38","255.255.255.255")||
	 isInNet(hostip, "10.140.124.10","255.255.255.255"))
	{
	return "DIRECT";
	}

// If the hostname matches, send direct.
	if (shExpMatch(host, "*.services.axa-tech.intraxa")||
	 shExpMatch(host, "*-jp.intraxa")||
	 shExpMatch(host, "*-dev.intraxa")||
	 shExpMatch(host, "*applications.corp.intraxa")||
	 shExpMatch(host, "*idc-002.axa.*")||
	 shExpMatch(host, "*.paas.intraxa")||
	 shExpMatch(host, "*.pts.local*")||
	 shExpMatch(host, "*icon*.corp.intr*")||
	 shExpMatch(host, "*.axa-intranet.intraxa")||
	 shExpMatch(host, "psoft-rh*.corp.intr*")||
	 shExpMatch(host, "*webex.com")||
	 shExpMatch(host, "*one.axa.com")||
	 shExpMatch(host, "peoplein.corp.intraxa")||
	 shExpMatch(host, "peoplein-ssosm.corp.intraxa")||
	 shExpMatch(host, "rasaxa2.axa.co.jp")||  // VPN
	 shExpMatch(host, "rasaxa3.axa.co.jp")||  // VPN
	 shExpMatch(host, "front.my-ecockpit.corp.intraxa")||
	 shExpMatch(host, "axatech2020strategy.axa.intraxa")||
	 shExpMatch(host, "hue-bigplay.asia.bigdata.intraxa")||
	 shExpMatch(host, "rstudio-bigplay.asia.bigdata.intraxa")||
	 shExpMatch(host, "connect-bigplay.asia.bigdata.intraxa")||
	 shExpMatch(host, "portal.paas.intraxa")||
	 shExpMatch(host, "*.webhop.axa.intraxa")||
	 shExpMatch(host, "*aura-devapsd.ppservices.axa-tech.intraxa")||
	 shExpMatch(host, "*aura-apsd.applications.services.axa-tech.intraxa")||
	 shExpMatch(host, "*aura-ppapsd.ppservices.axa-tech.intraxa")||
	 shExpMatch(host, "*lifejapan-aura-dev.corp.intraxa")||
	 shExpMatch(host, "*lifejapan-aura-pp.corp.intraxa")||
	 shExpMatch(host, "*lifejapan-aura.corp.intraxa")||
	 shExpMatch(host, "hue-daas.asia.pp-bigdata.intraxa")||
	 shExpMatch(host, "*smssllogon.axa.com")||
	 shExpMatch(host, "*atlassian.axa.com")||
 	 shExpMatch(host, "*10.227.94.146/systemconsole")||
 	 shExpMatch(host, "*10.227.94.18/systemconsole")||
  // SRP
	 dnsDomainIs(host, "srp.axa.com")||
	 dnsDomainIs(host, "srp-uat.axa.com")||
	 dnsDomainIs(host, "srp-dev.axa.com")||
  // Cloud
   	 shExpMatch(host, "*cloudmgmt.intraxa")||
 	 shExpMatch(host, "*privmgmt.intraxa")||
 	 shExpMatch(host, "*connect.axa")||
 	 shExpMatch(host, "*axa-cloud.com")||
 	 shExpMatch(host, "*github.axa.com")||
	 shExpMatch(host, "*jira.axa.com")||
	 shExpMatch(host, "*confluence.axa.com")||
  // passaxa
	 shExpMatch(host, "*smlogon.axa.com")||
	 dnsDomainIs(host, "fws.axa.com")||
	 dnsDomainIs(host, "fws.axa-tech.com")||
	 dnsDomainIs(host, "pp-fws.axa.com")||
  // Office365
	 dnsDomainIs(host, "outlook.office365.com")||
	 dnsDomainIs(host, "account.office.net")||
	 dnsDomainIs(host, "admin.microsoft.com")||
	 dnsDomainIs(host, "home.office.com")||
	 dnsDomainIs(host, "browser.pipe.aria.microsoft.com")||
	 dnsDomainIs(host, "mobile.pipe.aria.microsoft.com")||
	 dnsDomainIs(host, "portal.microsoftonline.com")||
	 dnsDomainIs(host, "nexus.officeapps.live.com")||
	 dnsDomainIs(host, "nexusrules.officeapps.live.com")||
	 dnsDomainIs(host, "agent.office.net")||
	 dnsDomainIs(host, "apc.delve.office.com")||
	 dnsDomainIs(host, "delve.office.com")||
	 dnsDomainIs(host, "jpn.delve.office.com")||
	 dnsDomainIs(host, "suite.office.net")||
	 dnsDomainIs(host, "webshell.suite.office.com")||
	 dnsDomainIs(host, "agent.office.net")||
	 dnsDomainIs(host, "api.login.microsoftonline.com")|| 
	 dnsDomainIs(host, "api.passwordreset.microsoftonline.com")|| 
	 dnsDomainIs(host, "autologon.microsoftazuread-sso.com")|| 
	 dnsDomainIs(host, "becws.microsoftonline.com")|| 
	 dnsDomainIs(host, "ccs.login.microsoftonline.com")|| 
	 dnsDomainIs(host, "ccs-sdf.login.microsoftonline.com")|| 
	 dnsDomainIs(host, "clientconfig.microsoftonline-p.net")|| 
	 dnsDomainIs(host, "companymanager.microsoftonline.com")|| 
	 dnsDomainIs(host, "device.login.microsoftonline.com")|| 
	 dnsDomainIs(host, "hip.microsoftonline-p.net")|| 
	 dnsDomainIs(host, "hipservice.microsoftonline.com")|| 
	 dnsDomainIs(host, "login.microsoft.com")|| 
	 dnsDomainIs(host, "login.microsoftonline.com")|| 
	 dnsDomainIs(host, "logincert.microsoftonline.com")|| 
	 dnsDomainIs(host, "loginex.microsoftonline.com")|| 
	 dnsDomainIs(host, "login-us.microsoftonline.com")|| 
	 dnsDomainIs(host, "login.microsoftonline-p.com")|| 
	 dnsDomainIs(host, "login.windows.net")||
	 dnsDomainIs(host, "nexus.microsoftonline-p.com")|| 
	 dnsDomainIs(host, "passwordreset.microsoftonline.com")|| 
	 dnsDomainIs(host, "provisioningapi.microsoftonline.com")|| 
	 dnsDomainIs(host, "stamp2.login.microsoftonline.com")||
	 dnsDomainIs(host, "adminwebservice.microsoftonline.com")||
	 dnsDomainIs(host, "broadcast.skype.com")||
	 dnsDomainIs(host, "scsinstrument-ss-us.trafficmanager.net")|| 
	 dnsDomainIs(host, "scsquery-ss-asia.trafficmanager.net")|| 
	 dnsDomainIs(host, "scsquery-ss-eu.trafficmanager.net")|| 
	 dnsDomainIs(host, "axa365.sharepoint.com")||
	 dnsDomainIs(host, "axa365-my.sharepoint.com")||
	 dnsDomainIs(host, "axa365-files.sharepoint.com")||
	 dnsDomainIs(host, "axa365-myfiles.sharepoint.com")||
	 dnsDomainIs(host, "autodiscover-s.outlook.com")||
	 dnsDomainIs(host, "autodiscover.axa.co.jp")||
	 shExpMatch(host, "*outlook.com")||
	 shExpMatch(host, "*outlook.office.com")||
	 shExpMatch(host, "*protection.outlook.com")||
	 shExpMatch(host, "*aria.microsoft.com")||
 	 shExpMatch(host, "*manage.office.com")||
	 shExpMatch(host, "*protection.office.com")||
	 shExpMatch(host, "*teams.microsoft.com")|| 
	 shExpMatch(host, "*teams.skype.com")||
	 shExpMatch(host, "*lync.com")||
	 shExpMatch(host, "*skype.com")||
	 shExpMatch(host, "*users.storage.live.com")||
	 shExpMatch(host, "*dc.trouter.io")||
	 shExpMatch(host, "*skypeforbusiness.com"))||
	 shExpMatch(host, "touch.facebook.com"))||
	{
	return "DIRECT";
	}

// If the protocol or URL matches, send direct.


// DEFAULT RULE: All other traffic, use below proxies, in fail-over order. !NO CHANGE!
	return "PROXY proxy.ads-jp.intraxa:8080; PROXY proxy.axa-nichidan.co.jp:8080";

  }
// End of Pac
