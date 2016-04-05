require('NSString,EMChatTimeCell,UIColor,CaseSeminarCell,CaseSeminarModel,CaseSeminarFrameModel,TalkAboutVC,EMChatViewCell,NSURL,DoctorInfo,UIImage,UIImageView+EMWebCache');
defineClass('ChatViewController', {
            tableView_cellForRowAtIndexPath: function(tableView, indexPath) {
            if (indexPath.row() < self.dataSource().count()) {
            var obj = self.dataSource().objectAtIndex(indexPath.row());
            if (obj.isKindOfClass(NSString.class())) {
            var timeCell = (EMChatTimeCell * ) tableView.dequeueReusableCellWithIdentifier("MessageCellTime");
            if (timeCell == null) {
            timeCell = EMChatTimeCell.alloc().initWithStyle_reuseIdentifier(UITableViewCellStyleDefault, "MessageCellTime");
            timeCell.setBackgroundColor(UIColor.clearColor());
            timeCell.setSelectionStyle(UITableViewCellSelectionStyleNone);
            }
            timeCell.textLabel().setText((NSString * ) obj);
            return timeCell;
            } else {
            var model = (MessageModel * ) obj;
            if (model.message().ext().objectForKey("newMsgType") && model.message().ext().objectForKey("newMsgType").isEqualToString("seminar")) {
            var cell = CaseSeminarCell.cellWithTableView(tableView);
            var dict = model.message().ext[()
                                           "msgBody"];
            //获取字典转模型
            var model = CaseSeminarModel.objectWithKeyValues(dict);
            //frame模型
            var frameModel = CaseSeminarFrameModel.alloc().init();
            frameModel.setCaseSeminarModel(model);
            cell.setCaseSeminarFrameModel(frameModel);
            cell.setSelectionStyle(UITableViewCellSelectionStyleNone);
            var weaksekf = self;
            cell.setBlock(block('NSString*', function(dynamicid) {
                                var vc = TalkAboutVC.alloc().init();
                                vc.setDymicID(dynamicid);
                                weaksekf.navigationController().pushViewController_animated(vc, YES);
                                }));
            return cell;
            }
            var cellIdentifier = EMChatViewCell.cellIdentifierForMessageModel(model);
            var cell = (EMChatViewCell * ) tableView.dequeueReusableCellWithIdentifier(cellIdentifier);
            if (cell == null) {
            cell = EMChatViewCell.alloc().initWithMessageModel_reuseIdentifier(model, cellIdentifier);
            cell.setBackgroundColor(UIColor.clearColor());
            cell.setSelectionStyle(UITableViewCellSelectionStyleNone);
            }
            cell.setMessageModel(model);
            cell.setChatter(self.chatter());
            cell.setToUserRealName(self.toUserRealName());
            cell.setToUserAvatar(self.toUserAvatar());
            if (model.isSender()) {
            cell.headImageView().sd_setImageWithURL_placeholderImage(NSURL.URLWithString(DoctorInfo.doctorInfo().photo()), UIImage.imageNamed("doctor_defaultImage"));
            } else {
            cell.headImageView().sd_setImageWithURL_placeholderImage(NSURL.URLWithString(self.toUserAvatar()), UIImage.imageNamed("doctor_defaultImage"));
            }
            return cell;
            }
            }
            return null;
            },
            });