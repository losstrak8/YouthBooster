import { ProjectSetupPage } from './../project-setup/project-setup';
import { Component,ViewChild } from '@angular/core';
import { ProjectProvider } from '../../providers/project/project';
import { NavController, NavParams,Keyboard } from 'ionic-angular';
import { FilterItemsPage } from '../filter-items/filter-items';
import { trigger,state,style,animate,transition} from '@angular/animations';
import { AngularFireDatabase } from "angularfire2/database";
import { ProfilePage } from '../profile/profile';
import { DetailsPage } from '../details/details';

@Component({
  selector: 'page-browse-projects',
  templateUrl: 'browse-projects.html',
  animations: [
  trigger('heart', [
          state('unliked', style({
            transform: 'scale(1,1)'
          })),
          state('liked', style({
            transform: 'scale(1.3,1.3)'
          })),
          transition('unliked <=> liked', animate('200ms ease-in-out'))
      ])]
})


export class BrowseProjectsPage {

  @ViewChild('myContent') content;

  showSearch = false;
  terms: string;

  constructor(public projectProvider : ProjectProvider,public navCtrl: NavController, public navParams: NavParams, public keyboard: Keyboard,private fdb: AngularFireDatabase)
  {
    this.projectProvider.projects = this.navParams.get('projects');

    if(this.navParams.get('filter'))
      this.projectProvider.filtercateg=this.navParams.get('filter');
  }

 fakeProjects: Array<any> = new Array(8);


 // go to the project page  and add views
 accessProject(project){
    //access page .push
   let newViews=project.views+1;

   this.fdb.list("/projects").update(project.projectId,{
   views : newViews
 });

 this.navCtrl.push(DetailsPage,{'project' : project , 'user' : this.projectProvider.users[project.author]})

 }

accessProfile(project){
  this.navCtrl.push(ProfilePage,{'profile' : this.projectProvider.users[project.author]})
}

addProject() {
  this.navCtrl.push(ProjectSetupPage);
}

 navigateFilter(){

   if(this.projectProvider.projects)
  this.navCtrl.push(FilterItemsPage,{'projects': this.projectProvider.projects});

 }

ionViewDidLoad(){
  setTimeout(() => {

    if(!this.projectProvider.projects)
this.projectProvider.load();

//this.projectProvider.setFilteredItems();
},1000);}


// show/hide search bar
  openSearchBox() {
     console.log("search");
    this.showSearch = !this.showSearch;
    this.content.scrollToTop();

  }


 }
