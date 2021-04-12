var app = new Vue({
    el: '#app',
    data: {
        grade: ['2016','2017','2018','2019','2020'],
        major: [
            '保险学','材料成型及控制工程','材料化学','材料科学与工程','材料类',
            '测绘工程','产品设计','朝鲜语','城市地下空间工程','城乡规划','车辆工程',
            '地理信息科学','电子科学与技术','电子信息工程','电子信息工程(中外合作)',
            '俄语','法语','翻译','风景园林','高分子材料与工程','工程管理',
            '工程力学','工业设计','国际经济与贸易','国际经济与贸易(国际教育实验班)',
            '国际旅游','国际商务','化学工程与工艺','环境工程','环境科学','环境科学与工程类',
            '环境设计','环境生态工程','会计学','会计学(ACCA)','会计学(中外合作办学)',
            '会展经济与管理','机械设计制造及其自动化','计算机科学与技术','建筑学','交通运输',
            '金融学','金融学(CFA)','金融学(中外合作办学)','酒店管理','粮食工程',
            '林产化工','林学','林学(陶铸实验班)','林学(中外合作办学)','林学类','旅游管理',
            '旅游管理类','旅游信息化与技术管理','木材科学与工程','能源与动力工程',
            '农林经济管理','汽车服务工程','人力资源管理','日语','软件工程','森林保护','森林工程',
            '社会体育指导与管理','生态学','生物工程','生物技术','生物科学类','食品科学与工程',
            '食品质量与安全','食品科学与工程类','市场营销','市场营销(国际)','视觉传达设计',
            '水土保持与荒漠化防治','通信工程','土地资源管理','土木工程','土木类','舞蹈学',
            '物流工程','物流管理','物流管理(国际教育实验班)','新能源科学与工程','信息与计算科学',
            '行政管理','音乐表演','应用物理学','英语','游憩与公园管理','园林','园艺','自动化'
        ],
        classname: ['1班','2班','3班','4班','5班','6班','7班','8班'],
        weekdays:['','星期一','星期二','星期三','星期四','星期五','星期六','星期日'],
        weekdays_en:['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
        times:[
            '第1,2节',
            '第3,4节',
            '第5,6节',
            '第7,8节',
            '第9,10节',
            '第11,12节'
        ],
        database:{
            'Monday':[],
            'Tuesday':[],
            'Wednesday':[],
            'Thursday':[],
            'Friday':[],
            'Saturday':[],
            'Sunday':[],
            'data':[[],[],[],[],[],[]]
        },
        selected: ['4','60','0'],
        section: ['1','2','3','4','5','6','7'],
        clicked: false,
    },
    methods:{
        /**
         * 解析对应的json文件进
         * @param {string} grade 年级
         * @param {string} major 专业
         * @param {string} classname 班级
         * @returns 解析成功返回一个js对象;解析失败(json文件不存在)返回false
         */
        parsejson:function(grade,major,classname){
            let filename = `./json/${grade}${major}${classname}.json`;
            let request = new XMLHttpRequest();
            request.open("get",filename,false);
            request.send(null);
            if (request.status == 200) {/*返回状态为200，即为数据获取成功*/
                return JSON.parse(request.responseText);
            }
            return false;
        },
        /**
         * 点击查询按钮后触发
         */
        search:function(){
            this.clicked = true;
            let json=this.parsejson(this.grade[parseInt(this.selected[0])],this.major[parseInt(this.selected[1])],this.classname[parseInt(this.selected[2])]);
            if(json){
                for(item of this.weekdays_en){
                    this.database[item]=json[item]
                }
                this.process();
            }else{
                alert('查询班级不存在,请确认学年、专业名、班级是否无误');
                this.reset();
            }
        },
        /**
         * 点击重置按钮后触发,将select的value值都置为默认值'0'
         */
        reset:function(){
            Vue.set(this.selected,0,'4');
            Vue.set(this.selected,1,'60');
            Vue.set(this.selected,2,'0');
            this.clicked=false;
        },
        /**
         * 当点击查询按钮后对已经处理好的json文件进行归并处理
         */
        process:function(){
            let week,section,status;
            let classtable="";
            for(let i=0;i<6;++i){
                for(let j=0;j<7;++j){
                    week = this.weekdays_en[j];
                    section = (i+1).toString();
                    status=false;
                    this.database[week].forEach(item => {
                        if(item.section===section){
                            if(status){
                                classtable+='------------------------<br/>'
                            }
                            classtable+=`<font title="课程名">${item.course_name}</font><br/>
                            <font title="教室">${item.class_room}</font><br/>
                            <font title="老师">${item.teacher}</font><br/>
                            <font title='周次(节次)'>${item.week}</font><br/>`;
                            status=true;
                        }
                    });
                    Vue.set(this.database.data[i],j,classtable);
                    classtable="";
                }
            }
            console.log(this.database.data);
        }
    },
    /* 没有理解 computed 乱写的 已废弃
    computed:{
        /**
         * @param {number} index_1 第几节课,取值0~5
         * @param {number} index_2 周几,取值1~7
         * @returns 对应的课表信息
         *
        dataprocesss:function(){
            let week = this.weekdays_en[this.index_2];
            let section = (this.index_1+1).toString();
            let classtable="";
            this.database[week].forEach(item => {
                if(item.section===section){
                    classtable+=`${item.course_name}
                    ${item.class_room}
                    ${item.teacher}
                    ${item.week}`;
                }
            });
            return classtable;
        }
    }
    */
});
