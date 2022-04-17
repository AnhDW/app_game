const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const startUI = $('.start')
const showImageUI = $('.show-img')
const questionUI = $('.question')
const gameoverUI = $('.game-over')

const btnStart = $('.btn-start')
const chooseAnswer = $('.answer')
const btnReset = $('.btn-reset')
//1 display
//2 click start
//3 load data


function display(x){
    const noneDisplay = screen.filter((item)=>{
        return item!== x
    })
    noneDisplay.map((item)=>{
        return item.style.display = 'none'
    })
    console.log(noneDisplay)
}




const app = {
    currentIndex:0,
    screen: [
        startUI,
        showImageUI,
        questionUI,
        gameoverUI,
    ],
    data:[
        {
            question:'Hai tay cô gái đang làm gì',
            listAnswer:[
                'Giơ lên trời',
                'Chào',
                'Dang ra',
                'Đút túi',
            ],
            isAnswer:3,
            img:'https://image-us.24h.com.vn/upload/4-2020/images/2020-11-27/anh-2-1606468194-510-width650height804.jpg'
            
        },
        {
            question:'Cô gái giơ tay nào lên',
            listAnswer:[
                'tay trái',
                'tay phải',
                'hai tay',
                'không có tay nào',
            ],
            isAnswer:0,
            img:'https://image-us.eva.vn/upload/4-2020/images/2020-11-09/dien-toan-ao-ren-cat-ho-tao-bao-hotgirl-lam-nguoi-nhin-roi-tri-boi-vua-buoi-khong-lo-118941692_1048519892259859_2750013589906493891_n-1604932700-341-width600height750.jpg'
            
        }
    ],
    handleEvent:function(){

        const show = btnStart.onclick = ()=>{
            this.display(this.screen[1])
            setTimeout(()=>{
                this.display(this.screen[2])
            },2000)
        }

        chooseAnswer.onclick = (e)=>{
            const correctAnswer = e.target.closest('.btn-answer')
            if(Number(correctAnswer.dataset.index)===this.data[this.currentIndex].isAnswer){
                this.currentIndex++
                if(this.currentIndex < this.data.length){
                   
                    show()
                    this.render()
                }else{
                    alert('Win')
                }
            }else{
                this.display(this.screen[3])
            }
        }
        btnReset.onclick = ()=>{
            this.currentIndex = 0
            this.start()
        }
    },
    display:function(x){
        const noneDisplay = this.screen.filter((item)=>{
            return item!== x
        })
        noneDisplay.map((item)=>{
            return item.style.display = 'none'
        })
        x.style.display = 'flex'
    },
    render:function(){
        const _data = this.data[this.currentIndex]
        const image =`
            <p>Level ${this.currentIndex + 1}</p>
            <img src="${_data.img}">
        `
        const answer = _data.listAnswer.map((item,index)=>{
            return `<button class="btn btn-answer" data-index="${index}">${item}</button>`
        })
        $('.question-content').innerHTML = `<p>${_data.question}</p>`
        $('.show-img').innerHTML = image
        chooseAnswer.innerHTML = answer.join('')
    }
    ,
    start:function(){
        this.display(this.screen[0])
        this.handleEvent()
        this.render()
    }
}
app.start()
console.log(app.data[0].listAnswer[app.data[0].isAnswer])