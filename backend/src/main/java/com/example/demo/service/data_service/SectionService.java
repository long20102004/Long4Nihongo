package com.example.demo.service.data_service;

import com.example.demo.model.FlashCard;
import com.example.demo.model.Question;
import com.example.demo.model.Section;
import com.example.demo.model.Word;
import com.example.demo.repository.SectionRepository;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class SectionService {
    private SectionRepository sectionRepository;
    private WordService wordService;
    private QuestionService questionService;
    private FlashCardService flashCardService;
    private MongoTemplate mongoTemplate;
    public void deleteById(String id) {
        System.out.println(id);
        for (Word word: wordService.findBySectionId(id)){
            wordService.deleteById(word.getId());
        }
        for (FlashCard flashCard: flashCardService.findBySectionId(id)){
            flashCardService.deleteById(flashCard.getId());
        }
        for (Question question: questionService.findBySectionId(id)){
            questionService.deleteById(question.getId());
        }
        Query query = new Query(Criteria.where("_id").is(id));
        Update update = new Update().set("isDeleted", 1);
        mongoTemplate.updateFirst(query, update, Section.class);
    }
    public List<Section> findSectionByLessonId(int lessonId) {
        return sectionRepository.findSectionByLessonId(lessonId);
    }

    public List<Section> findAll() {
        return sectionRepository.findAll();
    }

    public Section save(Section section) {
        return sectionRepository.save(section);
    }
    public Section findById(String id){
        return sectionRepository.findById(id).get();
    }
}