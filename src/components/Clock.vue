<template>
    <ul class="clock-box">
        <li class="timeItem mr10">{{firstHour}}</li>
        <li class="timeItem">{{lastHour}}</li>
        <span class="point">:</span>
        <li class="timeItem mr10">{{firstMinute}}</li>
        <li class="timeItem">{{lastMinute}}</li>
        <span class="point">:</span>
        <li class="timeItem mr10">{{firstSecond}}</li>
        <li class="timeItem">{{lastSecond}}</li>
    </ul>
</template>

<script>
import {getServeTime} from '@/api/system'
import moment from 'moment'
import baseUrl from '../utils/baseUrl'
export default {
    data() {
        return {
            myTime: null,
            firstHour: null,
            lastHour: null,
            firstMinute: null,
            lastMinute: null,
            firstSecond: null,
            lastSecond: null,
            times: 1
        };
    },
    created() {
       this.initTime()
    },
    methods: {
        initTime(){
            let start = Date.now()
            getServeTime({},{hiddenLoadingloading: true}).then(resp => {
                let respTime = Date.now() - start - 9000000 //响应时间
                this.myTime = Number(resp.data + respTime) //转印度时间
                let timeArr = moment(this.myTime).format('HH:mm:ss').split(':')
                this.formatTime(timeArr,() => {
                    this.runTime()
                })
            })
        },
        formatTime(arr,cb){
            let hour = arr[0].length == 1 ? '0' + arr[0] : arr[0].toString()
            this.firstHour = hour.charAt(0)
            this.lastHour = hour.charAt(1)
            let minute = arr[1].length == 1 ? '0' + arr[1] : arr[1].toString()
            this.firstMinute = minute.charAt(0)
            this.lastMinute = minute.charAt(1)
            let second = arr[2].length == 1 ? '0' + arr[2] : arr[2].toString()
            this.firstSecond = second.charAt(0)
            this.lastSecond = second.charAt(1)
            cb && cb()
        },
        runTime(){
            setTimeout(() => {
                this.myTime += 1000
                this.times++
                if(this.times % (60 * 3) == 0){ //隔三分钟校验一次
                    this.initTime()
                }else{
                    let timeArr = moment(this.myTime).format('HH:mm:ss').split(':')
                    this.formatTime(timeArr,() =>{
                        this.runTime()
                    })
                }
               
            },1000)
        }
    }
};
</script>

<style scoped lang="scss">
    .clock-box{
        display: flex;
        .mr10{margin-right: 10px;}
        .timeItem{
            width: 30px;
            height: 30px;
            line-height: 30px;
            border: solid 1px #000;
            border-radius: 10px;
            background: #000;
            font-size: 20px;
            color: #fff;
            box-shadow: 0 0 6px rgba(0, 0, 0, 0.5);
            text-align: center;
            font-family: 'Helvetica Neue';
        }
        .point{
            height: 30px;
            line-height: 30px;
            padding-left: 5px;
            padding-right: 5px;
        }
    }
    
</style>
