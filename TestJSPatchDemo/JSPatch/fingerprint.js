require('NSString,UITableView,EMChatTimeCell,UIColor,CaseSeminarCell,CaseSeminarModel,CaseSeminarFrameModel,TalkAboutVC,EMChatViewCell,NSURL,DoctorInfo,UIImage,UIImageView+EMWebCache,MessageModel,MJExtension');
defineClass('ChatViewController', {
            tableView_cellForRowAtIndexPath: function(tableView, indexPath) {
            console.log("success")
            if (indexPath.row() < self.dataSource().count()) {
                var obj = self.dataSource().objectAtIndex(indexPath.row());
                if(obj.isKindOfClass(NSString.class())) {
                    var timeCell = tableView.dequeueReusableCellWithIdentifier("MessageCellTime");
                    console.log(timeCell)
                    if (!timeCell) {
                        timeCell = EMChatTimeCell.alloc().initWithStyle_reuseIdentifier(0, "MessageCellTime");
                        timeCell.setBackgroundColor(UIColor.clearColor());
                        timeCell.setSelectionStyle(0);
                    }
                    timeCell.textLabel().setText(obj);
                    console.log(self.dataSource().objectAtIndex(indexPath.row()))
                    return timeCell;
                }else{
                    console.log(obj)
                    if (obj.message().ext().objectForKey('newMsgType') && obj.message().ext().objectForKey('newMsgType').isEqualToString('seminar')) {
                        console.log("seminar")
                        var cell = CaseSeminarCell.cellWithTableView(tableView);
                        var dict = obj.message().ext().objectForKey('msgBody');
                        var model = CaseSeminarModel.objectWithKeyValues(dict);
//                        var model = CaseSeminarModel.modelWithDic(dict);
                        var frameModel = CaseSeminarFrameModel.alloc().init();
                        frameModel.setCaseSeminarModel(model);
                        cell.setCaseSeminarFrameModel(frameModel);
                        cell.setSelectionStyle(0);
                        console.log(cell)
                        var weaksekf = self;
                        cell.setBlock(block('NSString*', function(dynamicid) {
                                var vc = TalkAboutVC.alloc().init();
                                vc.setDymicID(dynamicid);
                                weaksekf.navigationController().pushViewController_animated(vc, YES);
                                }));
                        return cell;
                    }
                    var cellIdentifier = EMChatViewCell.cellIdentifierForMessageModel(obj);
                    console.log(cellIdentifier)
                    var cell = tableView.dequeueReusableCellWithIdentifier(cellIdentifier);
                    console.log(cell)
                    if (!cell) {
                           console.log("error")
                         cell = EMChatViewCell.alloc().initWithMessageModel_reuseIdentifier(obj, cellIdentifier);
                         cell.setBackgroundColor(UIColor.clearColor());
                         cell.setSelectionStyle(0);
                   }
                   cell.setMessageModel(obj);
                   cell.setChatter(self.chatter());
                   cell.setToUserRealName(self.toUserRealName());
                   cell.setToUserAvatar(self.toUserAvatar());
                   if (obj.isSender()) {
                        console.log("sender")
                        cell.headImageView().sd__setImageWithURL_placeholderImage(NSURL.URLWithString(DoctorInfo.doctorInfo().photo()), UIImage.imageNamed("doctor_defaultImage"));
                   } else {
                        console.log("nosender")
                         cell.headImageView().sd__setImageWithURL_placeholderImage(NSURL.URLWithString(self.toUserAvatar()), UIImage.imageNamed("doctor_defaultImage"));
                    }
                    return cell;
                }
            }else{
                return null;
            }
//            return null

            },
});