import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/home/Home'
// 基础管理
import Student from '@/sc/student/Student'
import Teacher from '@/sc/teacher/Teacher'
import Classes from '@/sc/classes/Classes'
import Course from '@/sc/course/Course'
import Score from '@/sc/score/Score'
// 统计管理
import StatisticsClasses from '@/statistics/class/statisticsClasses'
import StatisticsCourse from '@/statistics/course/statisticsCourse'
import StatisticsTeacher from '@/statistics/teacher/statisticsTeacher'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children:[
        // 基础管理
        {
          path: '/student',
          name: 'student',
          component: Student
        },
        {
          path: '/teacher',
          name: 'teacher',
          component: Teacher
        },
        {
          path: '/classes',
          name: 'classes',
          component: Classes
        },
        {
          path: '/course',
          name: 'course',
          component: Course
        },
        {
          path: '/score',
          name: 'score',
          component: Score
        },

        // 统计管理
        {
          path: '/statisticsClasses',
          name: 'statisticsClasses',
          component: StatisticsClasses
        },
        {
          path: '/statisticsCourse',
          name: 'statisticsCourse',
          component: StatisticsCourse
        },
        {
          path: '/statisticsTeacher',
          name: 'statisticsTeacher',
          component: StatisticsTeacher
        },
      
      ]
    },

    
  ]
})
