<template>
	<div>
		<div class="lyric_singer">{{currentMusic.singer}}</div>
		<!--歌词-->
		<div id="asdsa"></div>
	  <div ref="musicLyric" class="music-lyric" @click="changePlayer">
	    <div class="music-lyric-items" :style="lyricTop">
	      <p v-if="!currentMusic.id">还没有播放音乐哦！</p>
	      <p v-else-if="nolyric">暂无歌词！</p>
	      <template v-else-if="lyric.length>0">
	        <p
	          v-for="(item,index) in lyric"
	          :key="index"
	          :class="{on:lyricIndex===index}"
	        >{{ item.text }}</p>
	      </template>
	      <p v-else>歌词加载失败！</p>
	    </div>
	  </div>
	</div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
	data() {
    return {
      top: 0, // 歌词居中
      lheight: 34
    }
  },

	computed: {
		...mapGetters(['currentMusic', 'lyricIndex', 'lyric', 'nolyric']),

    lyricTop () {
      return `transform :translate3d(0, ${-(this.lheight) *
        (this.lyricIndex - this.top)}px, 0)`
    }
  },

  mounted() {
    window.addEventListener('resize', () => {
      clearTimeout(this.resizeTimer)
      this.resizeTimer = setTimeout(() => this.clacTop(), 60)
    })
    this.$nextTick(() => this.clacTop())
    this.lheight = getComputedStyle(document.getElementById('asdsa'),null).getPropertyValue('line-height').replace(/px/g, '')
  },

  methods: {
    // 计算歌词居中的 top值
    clacTop() {
      const dom = this.$refs.musicLyric
      const { display = '' } = window.getComputedStyle(dom) // jquery版本不对，这可能会报错
      if (display === 'none') {
        return
      }
      const height = dom.offsetHeight
      this.top = Math.floor(height / this.lheight / 2)
    },
    
    changePlayer () { // 改变播放器页面样式，改为播放器
			this.setPlaystyle(0)
		},
		
		...mapMutations({
      setPlaystyle: 'SET_PLAYSTYLE'
    })
  }
}
</script>

<style scoped="scoped" lang="less">
#asdsa{
	display: none;
	line-height: 34px;
	padding: 0;
	margin: 0;
}
.lyric_singer{
	text-align: center;
	font-size: 14px;
	color: rgba(255, 255, 255, .6);
	line-height: 30px;
	line-height: 30px;
}
/*歌词部分*/
.music-lyric {
  position: absolute;
  top: 30px;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
  text-align: center;
  -webkit-mask-image: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0) 0,
    rgba(255, 255, 255, 0.6) 15%,
    rgba(255, 255, 255, 1) 25%,
    rgba(255, 255, 255, 1) 75%,
    rgba(255, 255, 255, 0.6) 85%,
    rgba(255, 255, 255, 0) 100%
  );
  .music-lyric-items {
    text-align: center;
    line-height: 34px;
    transform: translate3d(0, 0, 0);
    transition: transform 0.6s ease-out;
    text-overflow: ellipsis;
	  overflow: hidden;
	  white-space: nowrap;
    .on {
    	font-size: 18px;
      color: #1296db;
    }
  }
}
</style>