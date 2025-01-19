package com.example.demo.service.data_service;

import com.example.demo.model.FlashCard;
import com.example.demo.model.Question;
import com.example.demo.repository.QuestionRepository;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class QuestionService {
    private QuestionRepository questionRepository;
    private MongoTemplate mongoTemplate;
    public void deleteById(String id) {
        Query query = new Query(Criteria.where("_id").is(id));
        Update update = new Update().set("isDeleted", 1);
        mongoTemplate.updateFirst(query, update, Question.class);
    }
    public List<Question> findBySectionId(String sectionId) {
        return questionRepository.findBySectionId(sectionId);
    }

    public List<Question> findAll() {
        return questionRepository.findAll();
    }

    public Question save(Question question) {
        return questionRepository.save(question);
    }
    public Question findById(String id){
        return questionRepository.findById(id).get();
    }
}