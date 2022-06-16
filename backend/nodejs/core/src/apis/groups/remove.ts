import { Request } from 'express';
import { AbilityService, CurriculumService, GroupService, LearningService, QuestionService } from '@services';
import { Consts } from '@consts';
import { APIs } from 'typings';

/**
 * グループ情報削除
 * DELETE /groups/:groupId
 */
export default async (req: Request<APIs.GroupRemoveParams, any, any, any>): Promise<APIs.GroupRemoveResponse> => {
  const { groupId } = req.params;

  // describe
  const groupInfo = await GroupService.describe(groupId);

  // not exists
  if (!groupInfo) return;

  const questions = await QuestionService.listByGroup(groupInfo.id);
  const curriculums = await CurriculumService.listByGroup(groupInfo.id);

  // 一般グループ
  if (Consts.SUBJECT_NORMAL.includes(groupInfo.subject)) {
    const learnings = await LearningService.listByGroup(groupInfo.id);

    // execute all
    await Promise.all([
      // remove group
      GroupService.remove(groupId),
      // remove group questions
      QuestionService.truncate(questions),
      // remove curriculum
      CurriculumService.truncate(curriculums),
      // remove learnings
      LearningService.truncate(learnings),
    ]);
  }

  // 実力テストグループ
  if (Consts.SUBJECT_ABILITY.includes(groupInfo.subject)) {
    const abilities = await AbilityService.listByKey(groupId);
    // execute all
    await Promise.all([
      // remove group
      GroupService.remove(groupId),
      // remove group questions
      QuestionService.truncate(questions),
      // remove curriculum
      CurriculumService.truncate(curriculums),
      // remove weekly questions
      AbilityService.truncate(abilities),
    ]);
  }
};
