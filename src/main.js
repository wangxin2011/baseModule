import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import storage from "./utils/localstorage";
import './styles/common.scss';

import {
	Lazyload,
	NavBar,
	Toast,
	Icon,
	Notify,
	ActionSheet,
	Cell,
	CellGroup,
	Field,
	Area,
	Popup,
	Search,
	Button,
	Picker,
	Dialog,
	Form,
	List,
	PullRefresh,
	Tab,
	Tabs,
	Tabbar,
	TabbarItem,
	Checkbox,
	CheckboxGroup,
	DatetimePicker,
	RadioGroup,
	Radio,
	Collapse,
	CollapseItem,
	Divider,
	Tag,
	Switch,
	Row,
	Col,
	Grid,
	GridItem,
	Loading,
	Image
} from 'vant';



Vue.use(Lazyload, {
	lazyComponent: true,
	preLoad: 1.3,
	loading: require('@/assets/images/default-img.png'),
	attempt: 2
});

Vue.use(NavBar);
Vue.use(Toast);
Vue.use(Icon);
Vue.use(Notify);
Vue.use(ActionSheet);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Field);
Vue.use(Area);
Vue.use(Popup);
Vue.use(Search);
Vue.use(Button);
Vue.use(Picker);
Vue.use(Cell);
Vue.use(Dialog);
Vue.use(Form);
Vue.use(List);
Vue.use(PullRefresh);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(DatetimePicker);
Vue.use(RadioGroup);
Vue.use(Radio);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(Divider);
Vue.use(Tag);
Vue.use(Switch);
Vue.use(Row); 
Vue.use(Col); 
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(Loading);
Vue.use(Image);

Vue.prototype.$storage = storage;
Vue.config.productionTip = false;

// 获取微信Code
store.dispatch('app/setWXCode');
// 读取配置文件信息
store.dispatch('app/getConfig');

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
