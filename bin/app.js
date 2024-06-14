#!/usr/bin/env node 

const NodeMediaServer = require('node-media-server');
let argv = require('minimist')(process.argv.slice(2),
  {
    string:['rtmp_port','http_port','https_port'],
    alias: {
      'rtmp_port': 'r',
      'http_port': 'h',
      'https_port': 's',
    },
    default:{
      'rtmp_port': 1938,
      'http_port': 8080,
      'https_port': 443,
    }
  });
  
if (argv.help) {
  console.log('Usage:');
  console.log('  node-media-server --help // print help information');
  console.log('  node-media-server --rtmp_port 1935 or -r 1935');
  console.log('  node-media-server --http_port 8000 or -h 8000');
  console.log('  node-media-server --https_port 8443 or -s 8443');
  process.exit(0);
}


const config = {
    rtmp: {
      port: argv.rtmp_port,
      chunk_size: 100000,
      gop_cache: true,
      ping: 30,
      reconnect: true,
      ping_timeout: 30,
    },
    http: {
      port: 8080,
      allow_origin: '*',
      // "/mnt/dvr_volume/Recordings"
      mediaroot: './Recordings',
      api:true
    },
    trans: {
      ffmpeg: 'C:/ffmpeg/ffmpeg.exe',
    tasks: [
        {
            app: 'live',
            hls: true,
            // hlsFlags: '[hls_time=6:hls_list_size=5:hls_flags=delete_segments]',
            hlsFlags: '[hls_time=6:hls_list_size=5:hls_flags=delete_segments:strftime=1]',
            hlsDelay: 5,
        }
    ]
  },
  //   https: {
  //       port: 443,
  //       key:"./ambicam.key",
  //       cert:"./ambicam.crt",
  //  }
};


let nms = new NodeMediaServer(config);
nms.run();