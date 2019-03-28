// COPYRIGHT © 2018 Esri
//
// All rights reserved under the copyright laws of the United States
// and applicable international laws, treaties, and conventions.
//
// This material is licensed for use under the Esri Master License
// Agreement (MLA), and is bound by the terms of that agreement.
// You may redistribute and use this code without modification,
// provided you adhere to the terms of the MLA and include this
// copyright notice.
//
// See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
//
// For additional information, contact:
// Environmental Systems Research Institute, Inc.
// Attn: Contracts and Legal Services Department
// 380 New York Street
// Redlands, California, USA 92373
// USA
//
// email: contracts@esri.com
//
// See http://js.arcgis.com/4.11/esri/copyright.txt for details.

define(["require","exports","../../core/maybe","../../core/PooledArray"],function(e,t,r,i){function n(e){return new o.Scheduler(e)}function s(e){return new o.Budget(e)}Object.defineProperty(t,"__esModule",{value:!0}),t.newScheduler=n,t.newBudget=s;var o,u=100;!function(e){var t=function(){function t(t){this._now=t,this._budget=null,this._state=1,this._tasks=new i,this._runQueue=new i,this._idleStateCallbacks=new i,this._idleUpdatesStartFired=!1,this._forceTask=!1,this._safetyBudget=0,this._budget=new e.Budget(t);var r=this;this._test={state:void 0,idleBudget:u,get budget(){return r._budget.budget},elapsed:0}}return t.prototype.registerTask=function(e,t,r){var i=this,n={update:t,needsUpdate:r,priority:e,schedule:e};return this._tasks.push(n),{remove:function(){return i._removeTask(n)},set priority(e){n.priority=e,0!==n.schedule&&(n.schedule=e)}}},t.prototype.registerIdleStateCallbacks=function(e,t){var r=this,i={idleBegin:e,idleEnd:t};this._idleStateCallbacks.push(i),2===this.state&&this._idleUpdatesStartFired&&i.idleBegin();var n=this;return{remove:function(){return r._removeIdleStateCallbacks(i)},set idleBegin(e){n._idleUpdatesStartFired&&(i.idleEnd(),2===n._state&&e()),i.idleBegin=e},set idleEnd(e){i.idleEnd=e}}},Object.defineProperty(t.prototype,"now",{get:function(){return this._now()},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"state",{get:function(){return r.isNone(this._test.state)?this._state:this._test.state},set:function(e){this._state!==e&&(this._state=e,2!==this.state&&this._idleUpdatesStartFired&&(this._idleUpdatesStartFired=!1,this._idleStateCallbacks.forEach(function(e){return e.idleEnd()})))},enumerable:!0,configurable:!0}),t.prototype.updateBudget=function(e){var t=2===this.state,r=e.frameDuration;switch(this.state){case 2:r=u;break;case 1:r=Math.max(33,e.frameDuration);break;case 0:r=e.frameDuration}return this._safetyBudget=t?0:r>2.5*e.tickTime?e.tickTime:5,r-=e.elapsedFrameTime+this._safetyBudget,this._test.elapsed=0,!t&&r<0&&!this._forceTask?(this._forceTask=!0,!1):(r=Math.max(r,5),this._budget.reset(r,t),this._schedule())},t.prototype.frame=function(e){switch(this._forceTask=!1,this.state){case 2:this._idleUpdatesStartFired||(this._idleUpdatesStartFired=!0,this._idleStateCallbacks.forEach(function(e){return e.idleBegin()})),this._idleFrame();break;case 1:this._movingFrame();break;default:this._run()}this._test.elapsed=this._budget.elapsed},t.prototype._removeIdleStateCallbacks=function(e){this._idleUpdatesStartFired&&e.idleEnd(),this._idleStateCallbacks.removeUnordered(e)},t.prototype._removeTask=function(e){this._tasks.removeUnordered(e),this._runQueue.removeUnordered(e)},t.prototype._idleFrame=function(){this._run()},t.prototype._movingFrame=function(){this._run()},t.prototype._schedule=function(){var e=this;this._runQueue.forEach(function(e){e.needsUpdate()||(n.push(e),e.schedule=e.priority)}),this._runQueue.removeUnorderedMany(n.data,n.length),n.clear();for(var t=this;0===this._runQueue.length;){var r=function(){var r=!1;if(t._tasks.forEach(function(t){if(t.needsUpdate())switch(r=!0,t.schedule){case 0:break;case 1:t.schedule=0,e._runQueue.push(t);break;default:--t.schedule}}),!r)return{value:!1}}();if("object"==typeof r)return r.value}return!0},t.prototype._run=function(){for(;this._runQueue.length>0;){var e=this._runQueue.pop();if(this._budget.resetProgress(),e.update(this._budget),e.schedule=e.priority,this._budget.remaining<=0)return}},Object.defineProperty(t.prototype,"test",{get:function(){return this._test},enumerable:!0,configurable:!0}),t}();e.Scheduler=t;var n=new i,s=function(){function e(e){this.now=e,this._begin=0,this._budget=0,this._idle=!1,this._didWork=!1}return e.prototype.run=function(e){return!this.done&&(!0===e()&&(this._didWork=!0),!0)},Object.defineProperty(e.prototype,"done",{get:function(){return this._didWork&&this.elapsed>=this._budget},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"budget",{get:function(){return this._budget},enumerable:!0,configurable:!0}),e.prototype.madeProgress=function(){this._didWork=!0},Object.defineProperty(e.prototype,"idleFrame",{get:function(){return this._idle},enumerable:!0,configurable:!0}),e.prototype.reset=function(e,t){this._begin=this.now(),this._budget=e,this._idle=t,this._didWork=!1},Object.defineProperty(e.prototype,"remaining",{get:function(){return Math.max(this._budget-this.elapsed,0)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"elapsed",{get:function(){return this.now()-this._begin},enumerable:!0,configurable:!0}),e.prototype.resetProgress=function(){this._didWork=!1},Object.defineProperty(e.prototype,"hasProgressed",{get:function(){return this._didWork},enumerable:!0,configurable:!0}),e}();e.Budget=s}(o||(o={}))});