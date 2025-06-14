import { Op } from "sequelize";
import { Document } from "../../models";

export async function createDocument(userId: string, title: string, description: string, imageURL: string, ) {

    return await Document.create({
        userId,
        description, title, imageURL,     });

}


export async function findAllDocuments(
    userId: string,
    page: number = 1,
    limit: number = 10,
    search?: string
) {
    const offset = (page - 1) * limit;

    const whereCondition: any = { userId };

    if (search) {
        const likeSearch = { [Op.iLike]: `%${search}%` };

        const orConditions: any[] = [
            { title: likeSearch },
        ];

        whereCondition[Op.or] = orConditions;
    }

    const { rows: items, count: total } = await Document.findAndCountAll({
        where: whereCondition,
        limit,
        offset,
        order: [["createdAt", "DESC"]],
    });

    return {
        data: items,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
    };
}